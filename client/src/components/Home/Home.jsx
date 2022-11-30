import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.css';

import Search from '../Search/Search';
import CountryCard from '../CountryCard/CountryCard';
import FiltersnOrdering from '../Filters/FiltersnOrdering';
import { Pagination } from '../Pagination/Pagination';

import { getCountries } from '../../redux/actions/index.actions';

const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const { PaginationView, filterCountries } = Pagination(allCountries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getCountries());
  };

  return (
    <div>
      <div className={styles.mainContainerFilters}>
        <Search />

        <div>
          <FiltersnOrdering />
          {/* {console.log(Search)} */}
        </div>

        <div className={styles.containerReload}>
          <button onClick={(e) => handleClick(e)}>REFRESH</button>
        </div>
      </div>
      <div>{PaginationView}</div>

      <div className={styles.containerCards}>
        {filterCountries?.map((country) => {
          return (
            <CountryCard
              id={country.id}
              key={country.id}
              name={country.name}
              img={country.flag_image}
              continent={country.continent}
              population={country.population}
            />
          );
        })}
      </div>
      <div>{PaginationView}</div>
    </div>
  );
};

export default Home;
