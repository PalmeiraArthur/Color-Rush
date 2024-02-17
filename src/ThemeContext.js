import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(false);

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
        // Atualize o estilo do corpo aqui, se desejar, ou faça isso no componente Menu
        document.body.style.backgroundColor = darkTheme ? 'white' : '#333';
        document.body.style.color = darkTheme ? 'black' : 'white';
    };

    return (
        <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
