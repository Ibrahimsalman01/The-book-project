import { useCallback, useEffect, useState } from "react";
import { getChapter, getTotalChapters } from "../services/novels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const App = () => {
  const [chapter, setChapter] = useState<string[]>([]);
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [totalChapters, setTotalChapters] = useState<number>(0); //used to hold current number of chapters for novel

  const getNovelChapter = useCallback(async (novelId: number, chapterNumber: number) => {
    const response = await getChapter(novelId, chapterNumber);
    setChapter(response.pages);
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
      <div className="chapter-buttons">
        <button onClick={handlePrevChapter}>Prev</button>
        <button onClick={handleNextChapter}>Next</button>
        </div>
      <div className="chapter">
        {chapter.map((page, index) => (
          <img key={index} src={page} alt={`Page ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default App;
