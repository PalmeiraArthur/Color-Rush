import React, { useState, useEffect } from 'react';
import styles from "../testes/teste.module.css"; // Certifique-se de que o caminho esteja correto

// Lista de cores base para alternar entre as rodadas
const baseColors = ['#56E556', '#9D1717', '#375BDA', '#FF008A', '#56B6DF', '#F17922', '#730AB2', '#D3A93D'];

const adjustColor = (color, level) => {
    let [r, g, b] = color.match(/\w\w/g).map(c => parseInt(c, 16));
    const cycle = Math.floor((level - 1) / baseColors.length);
    const darkenFactorStart = 30;
    const decrementPerCycle = 90;
    const darkenFactor = Math.max(darkenFactorStart - cycle * decrementPerCycle, 20);
    r = Math.max(r - darkenFactor, 0);
    g = Math.max(g - darkenFactor, 0);
    b = Math.max(b - darkenFactor, 0);
    return `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')}`;
};

const generateColorsAndCorrectIndex = (level, baseColor, numberOfColors) => {
    const colors = new Array(numberOfColors).fill(baseColor);
    const differentColor = adjustColor(baseColor, level);
    const correctIndex = Math.floor(Math.random() * numberOfColors);
    colors[correctIndex] = differentColor;
    return { colors, correctIndex };
};

const Ball = ({ color, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                width: '82px',
                height: '82px',
                backgroundColor: color,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '10px',
                cursor: 'pointer',
            }}
        />
    );
};

const Game = () => {
    const [colors, setColors] = useState([]);
    const [correctIndex, setCorrectIndex] = useState(null);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [darkTheme, setDarkTheme] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [cyclesCompleted, setCyclesCompleted] = useState(0);
    const columns = Math.min(2 + cyclesCompleted, 4); // Limita a no máximo 4 colunas
    const themeIconSrc = darkTheme ? "./img/icone_claro.png" : "./img/icone_escuro.png"; // Atualize os caminhos conforme necessário

    const mainContainerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between', // Isso ajuda a distribuir o espaço entre os itens
      minHeight: '100vh', // Garante que o contêiner ocupe no mínimo a altura total da viewport
      padding: '0px 0', // Adiciona um pouco de espaço no topo e no fundo
  };

    

    useEffect(() => {
      const newCyclesCompleted = Math.floor((level - 1) / baseColors.length);
      setCyclesCompleted(newCyclesCompleted);
  }, [level]);
  


  useEffect(() => {
    const cyclesCompleted = Math.floor((level - 1) / baseColors.length);
    // Limita o número total de colunas a 4, começando com 2 colunas de 3 bolinhas cada
    const columns = Math.min(2 + cyclesCompleted, 4);
    // Calcula o número total de bolinhas baseado no número de colunas, mas limita a 12 bolinhas
    const numberOfColors = Math.min(columns * 3, 12);
    const baseColorIndex = (level - 1) % baseColors.length;
    const baseColor = baseColors[baseColorIndex];
    const { colors, correctIndex } = generateColorsAndCorrectIndex(level, baseColor, numberOfColors);
    setColors(colors);
    setCorrectIndex(correctIndex);
}, [level]);
  

    useEffect(() => {
        document.body.style.backgroundColor = darkTheme ? '#333' : 'white';
        document.body.style.color = darkTheme ? 'white' : 'black';
    }, [darkTheme]);

    const toggleTheme = () => setDarkTheme(!darkTheme);

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

    const creditStyle = {
        color: darkTheme ? 'white' : 'black',
        textAlign: 'center',
        fontSize: '17px',
        width: '100%', // Faz com que ocupe a largura total do contêiner
    };

      const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: `${columns * (82 + 20)}px`, // Ajuste baseado no número de colunas
        margin: '20px 0', // Adiciona margem acima e abaixo para separação dos elementos
    };

    if (gameOver) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <h1 className={styles.perdeu}>Você perdeu!</h1>
                <h3 className={styles.pontuacao} style={{ color: darkTheme ? 'white' : 'black' }}>Sua pontuação foi: <br></br>{score}</h3>
                <button className={styles.botao} onClick={restartGame}>Recomeçar</button>
            </div>
        );
    }

    return (
      <div style={mainContainerStyle}>
          <img className={styles.logos} src={darkTheme ? "/img/logo_escura.svg" : "/img/logo_claro.svg"} alt="Logo" />
          <button onClick={toggleTheme} style={{ background: 'none', border: 'none', padding: 0, cursor:'pointer'}}>
              <img src={themeIconSrc} alt="Toggle Theme" style={{ width: '60px', height: '60px', marginTop:"70px" }} />
          </button>
          <h2 className={styles.pontosJogo} style={{ color: darkTheme ? 'white' : 'black' }}>Pontuação: {score}</h2>
          <div style={containerStyle}>
              {colors.map((color, index) => (
                  <Ball key={index} color={color} onClick={() => handleBallClick(index)} />
              ))}
          </div>
          <div style={{...creditStyle, marginTop: '0px'}}> {/* Adiciona margem no topo para separar dos elementos acima */}
              <h3> 
                  Jogo criado por Arthur Palmeira em colaboração com o ChatGPT 4™
              </h3>
          </div>
      </div>
  );
};

export default Game;
