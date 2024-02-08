import React, { useState, useEffect } from 'react';

// Lista de cores base para alternar entre as rodadas
const baseColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

const adjustColor = (color, level) => {
  // Descompõe a cor base em componentes RGB
  let [r, g, b] = color.match(/\w\w/g).map(c => parseInt(c, 16));

  // Calcula o ajuste baseado no nível para reduzir a diferença gradualmente
  const adjustment = 20 + Math.floor(255 / (level + 1)); // Ajuste que se torna mais sutil com o nível

  // Ajusta um componente da cor (exemplo ajusta o vermelho para cores base vermelhas)
  r = (r + adjustment) % 256;

  // Reconstrói a cor em formato hexadecimal
  const adjustedColor = "#" + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');

  return adjustedColor;
};

const generateColorsAndCorrectIndex = (level, baseColor) => {
  const colors = new Array(5).fill(baseColor).map(() => baseColor);
  const differentColor = adjustColor(baseColor, level);
  colors.push(differentColor); // Adiciona a bola de cor diferente

  // Embaralha as cores e encontra o índice correto da cor diferente
  colors.sort(() => Math.random() - 0.5);
  const correctIndex = colors.indexOf(differentColor);

  return { colors, correctIndex };
};

const Ball = ({ color, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: color,
        borderRadius: '50%',
        display: 'inline-block',
        margin: '5px',
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

  useEffect(() => {
    const baseColorIndex = level % baseColors.length; // Seleciona a cor base com base no nível, ciclando pelas cores base
    const { colors, correctIndex } = generateColorsAndCorrectIndex(level, baseColors[baseColorIndex]);
    setColors(colors);
    setCorrectIndex(correctIndex);
  }, [level]);

  const handleBallClick = (index) => {
    if (index === correctIndex) {
      setScore(score + 1);
      setLevel(level + 1);
    } else {
      alert('Errado! Tente novamente.');
    }
  };

  return (
    <div>
      <h2>Pontuação: {score}</h2>
      <div>
        {colors.map((color, index) => (
          <Ball key={index} color={color} onClick={() => handleBallClick(index)} />
        ))}
      </div>
    </div>
  );
};

export default Game;
