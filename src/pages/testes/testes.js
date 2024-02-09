import React, { useState, useEffect } from 'react';
import styles from '../testes/testes.module.css'

// Lista de cores base para alternar entre as rodadas
const baseColors = ['#14B914', '#9D1717', '#00009E', '#FF008A', '#56B6DF', '#F17922', '#730AB2'];


const adjustColor = (color, level) => {
    let [r, g, b] = color.match(/\w\w/g).map(c => parseInt(c, 16));
  
    // Determina o ciclo de cores
    const cycle = Math.floor((level - 1) / baseColors.length);
  
    // Inicia com um fator de escurecimento maior para garantir um tom significativamente mais escuro no começo
    const darkenFactorStart = 100; // Valor inicial mais alto para um contraste mais forte
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
    </div>
  );
};

const Game = () => {
  const [colors, setColors] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [darkTheme, setDarkTheme] = useState(false);
  const [gameOver, setGameOver] = useState(false);

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
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setLevel(1);
    setGameOver(false);
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

  const creditStyle = {
    color: darkTheme ? 'white' : 'black',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    textAlign: 'center',
    fontSize: '17px',
  };


  if (gameOver) {
    // Tela de fim de jogo
    return (
      <div style={commonCenterStyle}>

        <h1 className={styles.perdeu}>Você perdeu!</h1>        
        <h3 style={{ color: darkTheme ? 'white' : 'black', marginTop: '20px', fontSize: '40px', textAlign: 'center', fontFamily:'Sansita'}}>Sua pontuação foi: <br></br>{score}</h3>
        <button className={styles.botao} onClick={restartGame} >Recomeçar</button>
      </div>
    );
  }

  const gameOverStyle = {
    ...commonCenterStyle,
    // Estilos adicionais caso necessário para a tela de fim de jogo
  };
 return (
    <div style={commonCenterStyle}>
      {/* Logo */}
      <img src={darkTheme ? "/img/logo_escura.svg" : "/img/logo_claro.svg"} alt="Logo" style={logoStyle} />

      {/* Créditos */}
      <div style={creditStyle}>
        <h3>
        Jogo criado por Arthur Palmeira em colaboração com o ChatGPT 4™
        </h3>
      </div>

      {/* Se o jogo terminou, mostrar tela de fim de jogo */}
      {gameOver ? (
        <div style={{ marginTop: '100px' }}> 
          <button onClick={restartGame}>Recomeçar</button>
        </div>
      ) : (
        // Se o jogo não terminou, mostrar elementos do jogo
        <>
          {/* Botão para alternar o tema */}
          <button onClick={toggleTheme} style={buttonStyle}>
            <img src={darkTheme ? "/img/icone_claro.png" : "/img/icone_escuro.png"} alt="Tema" />
          </button>

          {/* Pontuação */}
          <h2 style={{ color: darkTheme ? 'white' : 'black', marginTop: '20px', fontSize: '34px', textAlign: 'center' }}>
            Pontuação: {score}
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
        </>
      )}
    </div>
  );
};

export default Game;