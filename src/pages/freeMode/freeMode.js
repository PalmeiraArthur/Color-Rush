import React, { useState, useEffect } from 'react';
import styles from "../freeMode/freeMode.module.css";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../ThemeContext'; // Ensure this path is correct

const baseColors = ['#56E556', '#9D1717', '#375BDA', '#FF008A', '#56B6DF', '#F17922', '#914AC9', '#D3A93D'];

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

const FreeMode = () => {
    const [colors, setColors] = useState([]);
    const [correctIndex, setCorrectIndex] = useState(null);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [cyclesCompleted, setCyclesCompleted] = useState(0);
    const navigate = useNavigate();

    const goToMenu = () => {
        navigate('/');
    };

    // Use the useTheme hook to access darkTheme and toggleTheme
    const { darkTheme } = useTheme(); // Removed the local darkTheme state

    const columns = Math.min(2 + cyclesCompleted, 4); // Keeps the logic for the number of columns

    useEffect(() => {
        const newCyclesCompleted = Math.floor((level - 1) / baseColors.length);
        setCyclesCompleted(newCyclesCompleted);
    }, [level]);

    useEffect(() => {
        const cyclesCompleted = Math.floor((level - 1) / baseColors.length);
        const columns = Math.min(2 + cyclesCompleted, 4);
        const numberOfColors = Math.min(columns * 3, 12);
        const baseColorIndex = (level - 1) % baseColors.length;
        const baseColor = baseColors[baseColorIndex];
        const { colors, correctIndex } = generateColorsAndCorrectIndex(level, baseColor, numberOfColors);
        setColors(colors);
        setCorrectIndex(correctIndex);
    }, [level]);
    
    
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
    
    // Main container style adapted for centering
    const mainContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Adjusted for centering
        
    };
    
    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: `${columns * (82 + 20)}px`,
        margin: '20px 0',
    };
    
    const [bestScore, setBestScore] = useState(() => {
        // Recupera a melhor pontuação do localStorage ou define como 0
        const savedBestScore = localStorage.getItem('bestScore');
        return savedBestScore ? parseInt(savedBestScore, 10) : 0;
    });
    useEffect(() => {
        // Atualiza a melhor pontuação no localStorage sempre que a pontuação atual é maior
        if (score > bestScore) {
            setBestScore(score);
            localStorage.setItem('bestScore', score.toString());
        }
    }, [score, bestScore]);
    
    if (gameOver) {
        return (
            <div style={mainContainerStyle}>
                <h1 className={styles.perdeu}>Você perdeu!</h1>
                <h3 className={styles.pontuacao} style={{ color: darkTheme ? 'white' : 'black' }}>Sua pontuação foi: <br></br>{score}</h3>
                <button className={styles.botaoRestart} onClick={restartGame}>Recomeçar</button>
                <button className={styles.botaoVoltar} onClick={goToMenu}>Voltar ao menu</button>
                <div className={styles.melhorPontos}>
                sua melhor pontuação foi: {bestScore}
                </div>
            </div>
        );
    }

    return (
        <div style={mainContainerStyle}>
            <div>
                {darkTheme ? (<img src="./img/logo_branca.svg" alt="logo escura" />) : (<img src="./img/logo_preta.svg" alt="logo claro" />)}
            </div>
            <h2 className={styles.pontosJogo} style={{ color: darkTheme ? 'white' : 'black' }}>Pontuação: {score}</h2>
            <div style={containerStyle}>
                {colors.map((color, index) => (
                    <Ball key={index} color={color} onClick={() => handleBallClick(index)} />
                ))}
            </div>
            {/* Removed the theme toggle button since it's managed globally now */}
        </div>
    );
};

export default FreeMode;
