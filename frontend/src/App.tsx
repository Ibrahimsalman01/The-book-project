import { useCallback, useEffect, useState } from "react";
import { getChapter } from "../services/novels";

const App = () => {
  const [ novelChapter, setNovelChapter ] = useState<string[]>([]);

  const getNovelChapter = useCallback(async () => {
    const response = await getChapter(1, 1);
    setNovelChapter(response);
  }, []);

  useEffect(() => {
    getNovelChapter();
  }, [getNovelChapter]);

  return (
    <div>
      Hello World

      {
        novelChapter.map((chapter, index) => (
          <img key={index} src={chapter} alt={`Chapter ${index + 1}`} />
        ))
      }
    </div>
  );
}
export default App;
