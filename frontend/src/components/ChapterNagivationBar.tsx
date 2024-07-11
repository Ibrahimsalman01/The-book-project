import React from "react";

const ChapterNavigationBar = ({ 
    handlePrevChapter, 
    handleNextChapter, 
    currentChapter, 
    totalChapters, 
    selectBarChapter
  } : {
    handlePrevChapter: () => void;
    handleNextChapter: () => void;
    currentChapter: number;
    totalChapters: number;
    selectBarChapter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }) => {
  
  return (
    <div className="chapter-navigation">
      <button onClick={handlePrevChapter}>Prev</button>
        <button onClick={handleNextChapter}>Next</button>
        <select 
          value={`Chapter ${currentChapter}`}
          onChange={selectBarChapter}
        >
          {Array.from({ length: totalChapters }, (_, i) => i + 1).map(num => (
            <option key={num} value={`Chapter ${num}`} selected={num === currentChapter}>
              {`Chapter ${num}`}
            </option>
          ))}
        </select>
    </div>
  );
};

export { ChapterNavigationBar };