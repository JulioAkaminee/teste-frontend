import './App.css';

import { Route, Routes } from "react-router-dom";

import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import React from 'react';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}> 
    <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/user/:uuid" element={<UserDetails />} />
      </Routes>
     </BrowserRouter>
  );
}

export default App;
