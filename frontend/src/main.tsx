import React from 'react';
import ReactDOM from 'react-dom/client';
import ChapterPage from './ChapterPage.tsx';
import SeriesPage from './SeriesPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SeriesPage />
  </React.StrictMode>
);
