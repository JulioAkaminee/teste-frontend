import './App.css';

import { Route, Routes } from "react-router-dom";

import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import React from 'react';

function App() {
  return (
    <BrowserRouter> 
    <Routes>
      <Route path="/" element={<Home/>} />
      </Routes>
     </BrowserRouter>
  );
}

export default App;
