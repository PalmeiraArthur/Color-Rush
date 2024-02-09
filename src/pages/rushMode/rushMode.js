import React from 'react';
import styles from './rushMode.module.css'
import gif from '../../../src/felix.gif'

function RushMode() {
  return (
    <div className={styles.teste}>
      <h1>ei! nos ainda estamos trabalhando nisso<br></br> seja paciente...</h1>
      <img src={gif} alt="loading..." />

    </div>
    
  );
}

export default RushMode;