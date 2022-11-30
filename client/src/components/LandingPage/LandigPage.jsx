import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

export default function LandingPage() {
  return (
    <div className={styles.backgroundImg}>
      <div className={styles.container}>
        {/* <h1> Bienvenido a mi proyecto $</h1> */}
        {/* <p>Descripcion del proyecto</p> */}
        <Link to="/countries">
          <button className={styles.button}>GO →</button>
        </Link>
      </div>
    </div>
  );
}
