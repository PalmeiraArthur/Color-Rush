import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PaginaPrincipal from './pages/paginaPrincipal/paginaPrincipal';
import Game from './pages/testes/testes'


function App() {
  return (
    <Router>
      <Routes>
        {/* Rota para a página principal */}
        <Route path="/" element={<PaginaPrincipal />} />

        {/* Rota para a testes */}
        <Route path="/testes" element={<Game />} />
        
      </Routes>
    </Router>
  );
}

export default App;