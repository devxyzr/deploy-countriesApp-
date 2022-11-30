import React from 'react';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Filters.module.css';

import {
  getCountries,
  alphabeticOrderASC,
  alphabeticOrderDESC,
  populationOrderASC,
  populationOrderDESC,
  continentOrder,
  viewActivity,
} from '../../redux/actions/index.actions.js';

const FiltersnOrdering = ({
  getCountries,
  alphabeticOrderASC,
  alphabeticOrderDESC,
  populationOrderASC,
  populationOrderDESC,
  continentOrder,
  viewActivity,
}) => {
  const [sort, setOrder] = useState('');
  const [region, setRegion] = useState('');
  const [activity, setActivity] = useState('');
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  useEffect(() => {
    if (region) {
      getCountries().then((value) => {
        console.log(value);
        if (region !== 'all') {
          dispatch(continentOrder(region));
        }
      });
    }
  }, [region]);

  useEffect(() => {
    console.log({ countries });
  }, [countries]);

  useEffect(() => {
    if (sort === 'all') getCountries();
    else if (sort === 'a-z') alphabeticOrderASC();
    else if (sort === 'z-a') alphabeticOrderDESC();
    else if (sort === '↑ population') populationOrderASC();
    else if (sort === '↓ population') populationOrderDESC();
  }, [sort]);

  const activityHandler = (e) => {
    e.preventDefault();

    setActivity(e.target.value);
  };

  const searchActHandler = (e) => {
    e.preventDefault();
    getCountries();
    setTimeout(() => {
      dispatch(viewActivity(activity));
    }, 200);

    console.log(activity);
    setActivity('');
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.cardActivitiesChild}>
        <p>SORT BY: </p>

        <select onChange={(event) => setOrder(event.target.value)}>
          <option value="all">-</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="↑ population">↑ population</option>
          <option value="↓ population">↓ population</option>
        </select>

        <p>FILTER BY CONTINENT</p>

        <div className="">
          <select onChange={(event) => setRegion(event.target.value)}>
            <option value="all">All</option>
            <option value="South America">South America</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
            <option value="Asia">Asia</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: () => dispatch(getCountries()),
    alphabeticOrderASC: () => dispatch(alphabeticOrderASC()),
    alphabeticOrderDESC: () => dispatch(alphabeticOrderDESC()),
    continentOrder: (region) => dispatch(continentOrder(region)),
    viewActivity: (payload) => dispatch(viewActivity(payload)),
    populationOrderASC: () => dispatch(populationOrderASC()),
    populationOrderDESC: () => dispatch(populationOrderDESC()),
  };
};
const mapStateToProps = (state) => {
  return {
    countries: state.countries,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersnOrdering);
