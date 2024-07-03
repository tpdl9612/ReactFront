import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleHome from './views/article/main';
import ArticleWrite from './views/article/write';
import ArticleDetail from './views/article/detail';
import './App.css';





function App() {


  return (
    <Router>
    <Routes>
      <Route>
        <Route path="/" element={<ArticleHome />} />
        <Route path="/article/write" element={<ArticleWrite />} />
        <Route path="/article/detail/:articleId" element={<ArticleDetail />} />
      </Route>
    </Routes>
    </Router>
    // <div className="App">
      
    // </div>
  );
}

export default App;
