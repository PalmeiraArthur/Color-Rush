import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PaginaPrincipal from './pages/paginaPrincipal/paginaPrincipal';
import Game from './pages/testes/testes'


function App() {
  return (
    <Router>
      <Routes>
        {/* Rota para a página principal */}
        <Route path="/pagina-principal" element={<PaginaPrincipal />} />

        {/* Rota para a testes */}
        <Route path="/" element={<Game />} />
        
      </Routes>
    </Router>
  );
}

export default App;