import React, { useState, useEffect } from 'react';

// Lista de cores base para alternar entre as rodadas
const baseColors = ['#00ff00', '#ff0000', '#0000ff', '#ff00ff', '#00ffff'];


const adjustColor = (color, level) => {
    let [r, g, b] = color.match(/\w\w/g).map(c => parseInt(c, 16));
  
    // Determina o ciclo de cores
    const cycle = Math.floor((level - 1) / baseColors.length);
  
    // Inicia com um fator de escurecimento maior para garantir um tom significativamente mais escuro no começo
    const darkenFactorStart = 140; // Valor inicial mais alto para um contraste mais forte
    const decrementPerCycle = 40; // Quanto o fator de escurecimento diminui a cada ciclo completo de cores
  
    // Calcula o fator de escurecimento atual com base no ciclo, garantindo um mínimo de escurecimento
    const darkenFactor = Math.max(darkenFactorStart - cycle * decrementPerCycle, 20); // Assegura um mínimo de escurecimento
  
    // Aplica o fator de escurecimento aos componentes RGB
    r = Math.max(r - darkenFactor, 0);
    g = Math.max(g - darkenFactor, 0);
    b = Math.max(b - darkenFactor, 0);
  
    return `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')}`;
  };
  

const generateColorsAndCorrectIndex = (level, baseColor) => {
  const colors = new Array(5).fill(baseColor).map(() => baseColor);
  const differentColor = adjustColor(baseColor, level);
  colors.push(differentColor);
  colors.sort(() => Math.random() - 0.5);
  const correctIndex = colors.indexOf(differentColor);
  return { colors, correctIndex };
};

const Ball = ({ color, onClick, isDifferent }) => {
    return (
      <div
        onClick={onClick}
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: color,
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '5px',
          cursor: 'pointer',
          color: 'white',
          fontSize: '20px',
          fontWeight: 'bold',
          border: 'none',
        }}
      >
        {isDifferent ? 'C' : ''}
      </div>
    );
  };

const Game = () => {
  const [colors, setColors] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [darkTheme, setDarkTheme] = useState(false);

  // Gera as bolinhas com base no nível
  useEffect(() => {
    const baseColorIndex = (level - 1) % baseColors.length;
    const baseColor = baseColors[baseColorIndex];
    const { colors, correctIndex } = generateColorsAndCorrectIndex(level, baseColor);
    setColors(colors);
    setCorrectIndex(correctIndex);
  }, [level]);

  // Controle do tema escuro
  useEffect(() => {
    document.body.style.backgroundColor = darkTheme ? '#333' : 'white';
    document.body.style.color = darkTheme ? 'white' : 'black';
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  
  const iconStyle = {
    position: 'absolute', // Posiciona o ícone absolutamente em relação ao seu pai relativo mais próximo
    top: 10, // Alinha o topo do ícone com o topo do contêiner do texto
    left: 0, // Alinha o lado esquerdo do ícone com o lado esquerdo do contêiner do texto
    height: '100%', // Opcional: ajusta a altura do ícone conforme necessário
  };
  const scoreStyle = {
    position: 'relative', // Define o texto "Pontuação" como referência para o posicionamento absoluto
    color: darkTheme ? 'white' : 'black',
  };


  const buttonStyle = {
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    outline: 'none',
    padding: '10px',
  };

  const handleBallClick = (index) => {
    if (index === correctIndex) {
      setScore(score + 1);
      setLevel(level + 1);
    } else {
      alert('Errado! Tente novamente.');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '150px', // Limita a largura para forçar duas colunas
  };
  

  return (
    <div>
      <h2>Pontuação: {score}</h2>
      <button onClick={toggleTheme} style={{
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          outline: 'none',
          padding: '10px',
          position: 'relative', // Para que o ícone possa ser posicionado sobre o texto
        }}>
        {darkTheme ? (
          // Este é o ícone ou imagem para o tema escuro
          <img src="/img/icone_claro.png" alt="Tema Claro" />
        ) : (
          // Este é o ícone ou imagem para o tema claro
          <img src="/img/icone_escuro.png" alt="Tema Escuro" />
        )}

      </button>
      <div style={containerStyle}> {/* Aplica o estilo do contêiner aqui */}
        {colors.map((color, index) => (
          <Ball
            key={index}
            color={color}
            onClick={() => handleBallClick(index)}
            isDifferent={index === correctIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
