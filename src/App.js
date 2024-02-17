import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Menu from './pages/menu/menu';
import FreeMode from './pages/freeMode/freeMode';
import RushMode from './pages/rushMode/rushMode';
import Game from './pages/testes/teste';
import Modos from './pages/modos/modos';




function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Menu />} />
          
          <Route path='/modos' element={<Modos/>} />

          <Route path="/free-mode" element={<FreeMode />} />

          <Route path="/rush-mode" element={<RushMode />} />

          <Route path="/teste" element={<Game />} />
          
        </Routes>

      </ThemeProvider>
      
    </Router>
  );
}

export default App;