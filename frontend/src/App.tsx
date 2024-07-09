import { useCallback, useEffect, useState } from "react";
import { getChapter } from "../services/novels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const App = () => {
  const [ chapter, setChapter ] = useState<string[]>([]);

  const getNovelChapter = useCallback(async () => {
    const response = await getChapter(1, 1);
    setChapter(response);
  }, []);

  useEffect(() => {
    getNovelChapter();
  }, [getNovelChapter]);

  return (
    <div className="chapter-page">
      <div className="top-bar">
        The Book Project

        <button>prev chapter</button>
        <button>next chapter</button>
      </div>
      <div className="chapter">
        {
          chapter.map((page, index) => (
            <img 
              key={index} 
              src={page} 
              alt={`Page ${index + 1}`}
            />
          ))
        }
      </div>
    </div>
  );
}
export default App;
