import React, { useState } from 'react';
import styles from '../menu/menu.module.css';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import { useTheme } from '../../ThemeContext';


function Menu(){
    const [darkTheme, setDarkTheme] = useState(false); // Estado inicial falso, indicando tema claro
    const navigate = useNavigate();

    const toggleTheme = () => {
        setDarkTheme(!darkTheme); // Alterna o estado do tema
        // Atualiza o estilo do corpo da página conforme o tema
        document.body.style.backgroundColor = darkTheme ? 'white' : '#333';
        document.body.style.color = darkTheme ? 'black' : 'white';
    };

    const goToModos = () => {
        navigate('./modos'); // Substitua '/caminho-para-free-mode' pelo caminho real da sua rota
    }
    return (
        <div className={styles.geral}>
            
            <div className={styles.header}>
                <h1 className={styles.texto1}>Seja muito bem vindo ao</h1>

                    <div>
                    {darkTheme ? (
                        <img src="./img/logo_branca.svg" alt="logo escura" />
                    ) : (
                        <img src="./img/logo_preta.svg" alt="logo claro" />
                    )}
                    </div>

                <h1 className={styles.texto2}>um jogo de percepção e agilidade!</h1>
            </div>


            <div className={styles.body}>
                <div className={styles.explicação}>
                    <h3 className={styles.como}>Como jogar?</h3>
                    <h3 className={styles.identifique}>identifique a bolinha colorida que tem um tom diferente das outras bolinhas</h3>
                </div>

                <button className={styles.jogar}>
                    <p>Jogar</p>
                </button>


            </div>


            <div className={styles.footer}>

                <h3> alterar modo de tela:</h3>

                <button className={styles.botaoTema} onClick={toggleTheme} >
                    {darkTheme ? (
                        <img src='./img/icone_sol.svg' alt='icone claro'/>
                    ) : (
                        <img src='./img/icone_lua.svg' alt='icone escuro'/>
                    )}
                </button>

                



            </div>




                
            

        </div>
    );
}

export default Menu;