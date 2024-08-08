import React from "react";
import { useState, useEffect, useCallback } from "react";
import { getNovelPageInfo, getTotalChapters } from "../services/novels";

interface novelInfoObject {
  novelId: number;
  coverImage: string;
  seriesName: string;
  summary: string;
  author: string;
  rating: number;
  genres: string[];
  chapters: number[];
}

const SeriesPage = () => {
  const [novelInfo, setNovelInfo] = useState<novelInfoObject>();
  const [totalChapters, setTotalChapters] = useState(0);

  const getNovelPage = useCallback(async () => {
    try {
      const novelPageObj = await getNovelPageInfo(1);
      console.log(novelPageObj);
      setNovelInfo(novelPageObj as novelInfoObject);
    } catch (error) {
      console.error(`Could not get Novel Page info: ${error}`);
    }
  }, []);

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
    getNovelPage();
  }, [getNovelPage]);

  return (
    <div className="series-page">
      <div className="series-info">
        <h1>{novelInfo?.seriesName}</h1>
        <img src={novelInfo?.coverImage} /> <br />
        Author {novelInfo?.author}
        Summary {novelInfo?.summary}
        Rating {novelInfo?.rating}
      </div>
      <h2>Chapter list</h2>
      <div className="chapter-list">
        <ul>
          {Array.from({ length: totalChapters }, (_, i) => i + 1).map(num => (
            <li key={num}>Chapter {num}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SeriesPage;