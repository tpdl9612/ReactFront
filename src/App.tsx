import React, { useState, useEffect } from 'react';
import './App.css';
import { link } from 'fs';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';



function App() {


  return (
    <Routes>
      <Route>
        <Route path="/question" element={<ArticleHome />} />
        <Route path="/question/write" element={<ArticleWrite />} />
        <Route path="/question/detail/:questionId" element={<ArticleDetail />} />
        <Route path="/question/update/:questionId" element={<ArticleUpdate />} />
      </Route>
    </Routes>
    // <div className="App">
      
    // </div>
  );
}

export default App;
