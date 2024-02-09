import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Menu from './pages/menu/menu'
import FreeMode from './pages/freeMode/freeMode';
import RushMode from './pages/rushMode/rushMode'
import Game from './pages/testes/teste';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />

        <Route path="/free-mode" element={<FreeMode />} />

        <Route path="/rush-mode" element={<RushMode />} />

        <Route path="/teste" element={<Game />} />
        
      </Routes>
    </Router>
  );
}

export default App;