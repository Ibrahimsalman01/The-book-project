import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
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
  const { novelId } = useParams<{ novelId: string }>();
  const [novelInfo, setNovelInfo] = useState<novelInfoObject>();
  const [totalChapters, setTotalChapters] = useState(0);

  const getNovelPage = useCallback(async () => {
    try {
      const novelPageObj = await getNovelPageInfo(Number(novelId));
      setNovelInfo(novelPageObj as novelInfoObject);
    } catch (error) {
      console.error(`Could not get Novel Page info: ${error}`);
    }
  }, [novelId]);

  const fetchTotalChapters = async () => {
    try {
      const total = await getTotalChapters(Number(novelId));
      setTotalChapters(total);
    } catch (error) {
      console.error('Error fetching total chapters:', error);
    }
  };

  useEffect(() => {
    if (novelId) {
      fetchTotalChapters();
      getNovelPage();
    }
  }, [novelId, getNovelPage]);

  return (
    <div className="series-page">
      {novelInfo? (
        <>
          <div className="series-info">
            <h1>{novelInfo?.seriesName}</h1>
            <img src={novelInfo?.coverImage} /> <br />
            <p>Author {novelInfo?.author}</p>
            <p>Summary {novelInfo?.summary}</p>
            <p>Rating {novelInfo?.rating}</p>
          </div>
          <h2>Chapter list</h2>
          <div className="chapter-list">
            <ul>
              {Array.from({ length: totalChapters }, (_, i) => i + 1).map(num => (
                <li key={num}>
                  <Link to={`/series/${novelInfo?.novelId}/chapter/${num}`}>
                    Chapter {num}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SeriesPage;