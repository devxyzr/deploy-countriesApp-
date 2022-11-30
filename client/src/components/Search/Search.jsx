import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryName } from '../../redux/actions/index.actions';
import { getCountries } from '../../redux/actions/index.actions';
import styles from './Search.module.css';

export default function Search() {
  const [countryName, setCountryName] = useState('');
  const dispatch = useDispatch();
  const countryDetail = useSelector((state) => state.countries);

  const searchInputHandler = (e) => {
    setCountryName(e.target.value);
    console.log('1render');
    if (!countryName) dispatch(getCountries());
  };

  const clickHandler = (event) => {
    event.preventDefault();
    dispatch(getCountryName(countryName));
  };

  return (
    <div className={styles.searchContainer}>
      <button type="submit" onClick={clickHandler}>
        <p> SEARCH </p>
      </button>
      <input
        type="text"
        placeholder={'Find your country'}
        onChange={(e) => {
          searchInputHandler(e);
        }}
        value={countryName}
      />
    </div>
  );
}
