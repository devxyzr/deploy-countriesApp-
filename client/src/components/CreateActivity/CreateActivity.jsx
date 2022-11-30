import React from 'react';
import { useEffect, useState } from 'react';
import {
  difficulties,
  seasons,
  duration as durationOptions,
  reg_ex,
} from '../utils';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/index.actions';
import styles from './CreateActivity.module.css';

const CreateActivityComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const allcountries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(actions.getCountries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(actions.viewActivity());
  }, [dispatch]);

  const [name, setName] = useState('');
  const [season, setSeason] = useState('');
  const [duration, setDuration] = useState(0);
  const [countries, setCountries] = useState([]);
  const [difficulty, setDifficulty] = useState(0);

  const [errors, setErrors] = useState({
    name: '',
  });

  const validateActivityName = () => {
    let errors = {};

    if (!name) errors.name = '*Activity name is required';
    else if (!reg_ex.test(name))
      errors.name =
        '*Activity name is invalid: simbols or numbers are not allowed';
    else errors.name = '';
    return errors;
  };

  const handlerChangeName = (event) => {
    let value = event.target.value;
    value = value.charAt(0).toUpperCase() + value.slice(1);
    setName(value);
    setErrors(validateActivityName());
  };

  const handlerSelectCountry = (e) => {
    setCountries([...countries, e.target.value]);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    const values = {
      season,
      countries,
      name: name.trim(),
      length_time: Number(duration),
      difficulty: Number(difficulty),
    };

    dispatch(actions.createActivity(values));

    setName('');
    setSeason('');
    setDuration(0);
    setCountries([]);
    setDifficulty(0);

    history.push('/countries');
  };

  const handlerDelete = (event) => {
    const deleteCountry = countries.filter(
      (country) => country !== event.target.value
    );
    setCountries(deleteCountry);
  };

  const disabledSubmit = () =>
    !name ||
    !season ||
    !duration ||
    errors.name ||
    !difficulty ||
    !name.trim() ||
    !countries.length;

  return (
    <div className={styles.containerMain}>
      <form className="" onSubmit={handlerSubmit}>
        <div className={styles.cardActivities}>
          <div className={styles.card}>
            <h2 className="">CREATE YOUR ACTIVITY</h2>
            <div className={styles.cardActivitiesChild}>
              <label className="">NAME: </label>

              <input
                type="text"
                name="name"
                onChange={handlerChangeName}
                onBlur={() => {
                  setName(name.trim());
                  setErrors(validateActivityName());
                }}
                placeholder={"  Here goes the activity's name"}
                value={name}
              />

              {errors.name && <p className="">{errors.name}</p>}

              <label className="">DIFFICULTY: </label>

              <select
                className=""
                name="difficulty"
                onChange={(e) => setDifficulty(e.target.value)}
                value={difficulty}
              >
                <option hidden selected>
                  Select from 1 to 5
                </option>
                {difficulties.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>

              <label className="">DURATION: </label>

              <select
                className=""
                name="duration"
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
              >
                <option hidden selected>
                  Set the duration
                </option>
                {durationOptions.map((durationTime, index) => (
                  <option key={index} value={durationTime.value}>
                    {durationTime.label}
                  </option>
                ))}
              </select>

              <label className="">SEASON:</label>

              <select
                className=""
                name="season"
                onChange={(e) => setSeason(e.target.value)}
                value={season}
              >
                <option hidden selected>
                  Select a season
                </option>
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    {season}
                  </option>
                ))}
              </select>

              <label className="">COUNTRIES: </label>

              <select
                className=""
                name="countries"
                onChange={handlerSelectCountry}
              >
                <option hidden selected>
                  Select one or more countries
                </option>
                {allcountries.map((country) => (
                  <option key={country.id} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>

              <div>
                {countries &&
                  countries.map((country, index) => (
                    <div
                      className={styles.cardActivitiesChildCountry}
                      key={index}
                    >
                      <p>{country}</p>
                      <button
                        className=""
                        value={country}
                        onClick={handlerDelete}
                      >
                        ❌
                      </button>
                    </div>
                  ))}
              </div>
              <div className={styles.buttonCreate}>
                <button disabled={disabledSubmit()} type="submit">
                  CREATE ACTIVITY
                </button>
              </div>
              {disabledSubmit() && (
                <p className="">
                  Button disabled, one or more fields are empty
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateActivityComponent;
