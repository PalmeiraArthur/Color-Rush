import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Inicializa o estado darkTheme com base no valor armazenado no localStorage, se houver, ou falso por padrão
    const [darkTheme, setDarkTheme] = useState(() => {
        const isDark = localStorage.getItem('darkTheme');
        return isDark === 'true'; // Garante que a string "true" seja convertida para o booleano true
    });

    useEffect(() => {
        // Atualiza o localStorage e o estilo do corpo quando darkTheme muda
        localStorage.setItem('darkTheme', darkTheme);
        document.body.style.backgroundColor = darkTheme ? '#333' : 'white';
        document.body.style.color = darkTheme ? 'white' : 'black';
    }, [darkTheme]);

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    };

    return (
        <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
