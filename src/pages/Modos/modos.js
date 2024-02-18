import React, { useState } from 'react';
import styles from '../modos/modos.module.css';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import { useTheme } from '../../ThemeContext';


function Modos(){
    const { darkTheme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const goToFreeMode = () => {
        navigate('/free-mode'); // Substitua '/caminho-para-free-mode' pelo caminho real da sua rota
    }

    const goToRushMode = () => {
        navigate('/rush-mode'); // Substitua '/caminho-para-free-mode' pelo caminho real da sua rota
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
                <h1>escolha o modo de jogo:</h1>



                <div className={styles.botoesJogo} >
                    <button className={styles.botaoFree} onClick={goToFreeMode}>
                        <p className={styles.freemode}> Free Mode</p>
                        <p className={styles.joguelivre}>Jogue livremente sem se preocupar com o tempo!</p>
                    </button>
                
                    <button className={styles.botaoRush } onClick={goToRushMode}>
                        <p className={styles.rushmode}> Rush Mode!</p>
                        <p className={styles.joguetimer}>Jogue com um timer de 5 segundos que reinicia toda vez que você acerta uma bolinha!</p>
                    </button>
                </div>



            </div>


        </div>
    );
}

export default Modos;