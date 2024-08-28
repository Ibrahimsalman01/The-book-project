import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChapter, getTotalChapters } from "../services/novels";
import { ChapterNavigationBar } from "./components/ChapterNagivationBar";
import "./ChapterPage.css";


export interface novelObject {
  novelId: number,
  chapterId: number,
  seriesName: string,
  chapterNumber: number,
  pages: string[]
}

const ChapterPage = () => {
  const { novelId, chapterId } = useParams<{novelId: string, chapterId: string}>();
  const [chapter, setChapter] = useState<novelObject>();
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const [totalChapters, setTotalChapters] = useState<number>(0); // used to hold current number of chapters for novel
  const navigate = useNavigate();


  const getNovelChapter = useCallback(async () => {
    if (novelId && chapterId) {
      const response = await getChapter(Number(novelId), Number(chapterId));
      const chapterData = response as novelObject;
      setChapter(chapterData);
      setCurrentChapter(chapterData.chapterNumber);
    }
  }, [novelId, chapterId]);

  const handlePrevChapter = () => {
    if (currentChapter > 1) {
      navigate(`/series/${novelId}/chapter/${currentChapter - 1}`);
    }
  };

  const handleNextChapter = async () => {
    if (currentChapter < totalChapters) {
      navigate(`/series/${novelId}/chapter/${currentChapter + 1}`);
    }
  };

  const fetchTotalChapters = async () => {
    try {
      const total = await getTotalChapters(Number(novelId));
      setTotalChapters(total);
    } catch (error) {
      console.error('Error fetching total chapters:', error);
    }
  };

  useEffect(() => {
    if (novelId && chapterId) {
      fetchTotalChapters();
      getNovelChapter();
    }
  }, [novelId, chapterId, getNovelChapter]);

  return (
    <div className="chapter-page">
      <div className="top-bar">
        The Book Project
      </div>
      <div className="series-info">
        {`Home > ${chapter?.seriesName} > Chapter ${chapter?.chapterNumber}`}
      </div>
      <ChapterNavigationBar
        handlePrevChapter={handlePrevChapter}
        handleNextChapter={handleNextChapter}
        currentChapter={currentChapter}
        totalChapters={totalChapters}
        selectBarChapter={(e) => navigate(`/series/${novelId}/chapter/${e.target.value.split(" ")[1]}`)}
      />
      <div className="chapter">
        {chapter?.pages.map((page, index) => (
          <img key={index} src={page} alt={`Page ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ChapterPage;
