import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SeriesPage from "./SeriesPage";
import ChapterPage from "./ChapterPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/series/:novelId" element={<SeriesPage />} />
        <Route path="/series/:novelId/chapter/:chapterId" element={<ChapterPage />} />
      </Routes>
    </Router>
  );
};

export default App;