import { useCallback, useEffect, useState } from "react";
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
  const [chapter, setChapter] = useState<novelObject>();
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [totalChapters, setTotalChapters] = useState<number>(0); //used to hold current number of chapters for novel

  const getNovelChapter = useCallback(async (novelId: number, chapterNumber: number) => {
    const response = await getChapter(novelId, chapterNumber);
    setChapter(response as novelObject);
  }, []);

  const handlePrevChapter = () => {
    setCurrentChapter((prev) => Math.max(prev - 1, 1));
  };

  const handleNextChapter = async () => {
    setCurrentChapter((prev) => Math.min(prev + 1, totalChapters));
  };

  const fetchTotalChapters = async () => {
    try {
      const total = await getTotalChapters(1);
      setTotalChapters(total);
    } catch (error) {
      console.error('Error fetching total chapters:', error);
    }
  };

  useEffect(() => {  
    fetchTotalChapters();
    getNovelChapter(1, currentChapter);
    
  }, [getNovelChapter, currentChapter]);

  return (
    <div className="chapter-page">
      <div className="top-bar">
        The Book Project
      </div>
      <div className="series-info">
        {`Home > ${chapter?.seriesName} > Chapter ${currentChapter}`}
      </div>
      <ChapterNavigationBar
        handlePrevChapter={handlePrevChapter}
        handleNextChapter={handleNextChapter}
        currentChapter={currentChapter}
        totalChapters={totalChapters}
        selectBarChapter={(e) => setCurrentChapter(Number(e.target.value.split(" ")[1]))}
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
