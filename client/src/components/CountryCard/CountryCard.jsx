import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CountryCard.module.css';

import { setContinentImg, setPopulation } from '../utils';

const CountryCard = ({ name, id, img, continent, population }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div>
          <img className={styles.headerImage} src={img} alt={'Img not found'} />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.continentImage}>
            <Link to={`countries/${id}`}>
              <h2 className={styles.countryName}>{name}</h2>
            </Link>
            {setContinentImg[continent]}
          </div>
          <h4 className={styles.continentName}>Continent: {continent}</h4>
          <div className={styles.populationInfo}>
            Population:{' '}
            <p> {new Intl.NumberFormat('en-US').format(population)} </p> ({' '}
            {setPopulation(population)})
          </div>
          <div className={styles.buttonCard}>
            <Link className="" to={`countries/${id}`}>
              <button className={styles.buttonDetail}>SEE DATAILS</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
