import React, { useState } from 'react';
import styles from '../menu/menu.module.css';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate

function Menu(){
    const [darkTheme, setDarkTheme] = useState(false); // Estado inicial falso, indicando tema claro
    const navigate = useNavigate();

    const toggleTheme = () => {
        setDarkTheme(!darkTheme); // Alterna o estado do tema
        // Atualiza o estilo do corpo da página conforme o tema
        document.body.style.backgroundColor = darkTheme ? 'white' : '#333';
        document.body.style.color = darkTheme ? 'black' : 'white';
    };

    const goToFreeMode = () => {
        navigate('./free-mode'); // Substitua '/caminho-para-free-mode' pelo caminho real da sua rota
    }

    const goToRushMode = () => {
        navigate('./rush-mode'); // Substitua '/caminho-para-free-mode' pelo caminho real da sua rota
    }

    return (
        <div className={styles.header}>
            
        
            <div className={styles.textos}>

                <h1 className={styles.texto1}>Seja muito bem vindo ao</h1>

                    <div>
                    {darkTheme ? (
                        <img src="./img/logo_escura.svg" alt="logo escura" />
                    ) : (
                        <img src="./img/logo_claro.svg" alt="logo claro" />
                    )}
                    </div>

                <h1 className={styles.texto2}>um jogo de percepção e agilidade!</h1>

                <button className={styles.botaoTema} onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    {darkTheme ? (
                        <img src='./img/icone_claro.png' alt='icone claro' style={{ width: '50px', height: '50px' }} />
                    ) : (
                        <img src='./img/icone_escuro.png' alt='icone escuro' style={{ width: '50px', height: '50px' }} />
                    )}
                </button>

                <div className={styles.explicação}>
                    <h3 className={styles.como}>Como jogar?</h3>
                    <h3 className={styles.identifique}>identifique a bolinha colorida que tem um tom diferente das outras bolinhas</h3>

                </div>

                <div className={styles.botoesJogo} >
                        <button className={styles.botaoFree} onClick={goToFreeMode}>
                            <p className={styles.freemode}> Free Mode</p>
                            <p className={styles.joguelivre}>Jogue livremente sem se preocupar como tempo!</p>
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

export default Menu;