// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstScreen from './Screen/FirstScreen';  // Updated import path
import SecondScreen from './Screen/SecondScreen';  // Updated import path
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstScreen />} />
        <Route path="/second" element={<SecondScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
