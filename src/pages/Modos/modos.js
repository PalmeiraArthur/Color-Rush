import React, { useState } from 'react';
import styles from '../modos/modos.module.css';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import { useTheme } from '../../ThemeContext';


function Modos(){
    const { darkTheme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const goToFreeMode = () => {
        navigate('./free-mode'); // Substitua '/caminho-para-free-mode' pelo caminho real da sua rota
    }

    const goToRushMode = () => {
        navigate('./rush-mode'); // Substitua '/caminho-para-free-mode' pelo caminho real da sua rota
    }

    return (
        <div className={styles.geral}>
            
            <div className={styles.header}>

                    <div>
                    {darkTheme ? (
                        <img src="./img/logo_branca.svg" alt="logo escura" />
                    ) : (
                        <img src="./img/logo_preta.svg" alt="logo claro" />
                    )}
                    </div>

            </div>


            <div className={styles.body}>

                <button className={styles.jogar}>
                    <p>Jogar</p>
                </button>


            </div>


        </div>
    );
}

export default Modos;