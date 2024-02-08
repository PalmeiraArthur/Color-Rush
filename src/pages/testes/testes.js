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
        width: '82px', // Aumenta a largura da bolinha
        height: '82px', // Aumenta a altura da bolinha
        backgroundColor: color,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px', // Aumenta o espaço entre as bolinhas
        cursor: 'pointer',
        color: 'white',
        fontSize: '24px', // Aumenta o tamanho da fonte se houver texto dentro das bolinhas
        fontWeight: 'bold',
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
  

  const handleBallClick = (index) => {
    if (index === correctIndex) {
      setScore(score + 1);
      setLevel(level + 1);
    } else {
      alert('Errado! Tente novamente.');
    }
  };

  // Estilo centralizado para todos os elementos
  const commonCenterStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    marginBottom: '0pxpx',
    marginTop: '0px'
  };

  // Estilo para as logos
  const logoStyle = {
    position: 'absolute', // Posiciona a logo de forma absoluta em relação ao viewport
    top: 35, // Coloca a logo no topo da tela
    left: '50%', // Centraliza a logo horizontalmente
    transform: 'translateX(-50%)', // Ajusta a centralização horizontal
    width: '260px', // Largura da logo
    objectFit: 'contain',
    zIndex: 1000, // Garante que a logo fique sobre outros elementos
  };

  // Estilo para o contêiner das bolinhas
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '208px', // Largura suficiente para duas colunas de bolinhas maiores
    marginBottom: '45px', // Centraliza o container das bolinhas
  };

  // Estilo para o botão
  const buttonStyle = {
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    outline: 'none',
    padding: '10px',
    marginTop: '140px',
    marginBottom: '0px',
  };
  return (
    <div style={commonCenterStyle}>
      {/* Logos que mudam com o tema */}
      {darkTheme ? (
        <img src="/img/logo_escura.svg" alt="Logo Escuro" style={logoStyle} />
      ) : (
        <img src="/img/logo_claro.svg" alt="Logo Claro" style={logoStyle} />
      )}

      {/* Botão para alternar o tema */}
      <button onClick={toggleTheme} style={buttonStyle}>
        {darkTheme ? (
          <img src="/img/icone_claro.png" alt="Tema Claro" />
        ) : (
          <img src="/img/icone_escuro.png" alt="Tema Escuro" />
        )}
      </button>

      {/* Pontuação */}
      <h2 style={{ color: darkTheme ? 'white' : 'black', marginTop: '35px', marginBottom: '35 px', fontSize: '34px', textAlign:'center'}}>
        Pontuação: <br></br>{score}
      </h2>

      {/* Contêiner das bolinhas */}
      <div style={containerStyle}>
        {colors.map((color, index) => (
          <Ball
            key={index}
            color={color}
            onClick={() => handleBallClick(index)}
            isDifferent={index === correctIndex}
          />
        ))}
      </div>
      <h3 style={{ color: darkTheme ? 'white' : 'black', position: 'absolute', bottom:0, textAlign:'center', fontSize: '17px', marginLeft:'40px', marginRight:'40px'}}>
        Jogo criado por Arthur Palmeira em colobaração com o ChatGPT 4™
      </h3>
    </div>
  );
};

export default Game;
