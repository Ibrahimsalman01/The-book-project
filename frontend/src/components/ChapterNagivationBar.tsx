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
      <button 
        onClick={handlePrevChapter} disabled={currentChapter <= 1}>Prev</button>
      <select 
        value={`Chapter ${currentChapter}`}
        onChange={selectBarChapter}
      >
        {Array.from({ length: totalChapters }, (_, i) => i + 1).map(num => (
          <option key={num} value={`Chapter ${num}`}>
            {`Chapter ${num}`}
          </option>
        ))}
      </select>
      <button onClick={handleNextChapter} disabled={currentChapter >= totalChapters}>Next</button>
    </div>
  );
};

export { ChapterNavigationBar };