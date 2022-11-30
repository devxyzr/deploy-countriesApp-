import React from 'react';
import Loading from '../Loanding/Loanding';
import NotFound from '../NotFound/NotFound';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './CountryDetail.module.css';
import * as actions from '../../redux/actions/index.actions';
import {
  setContinentImg,
  setPopulation,
  sqrmetters,
  location,
  imgcontinents,
} from '../utils';

const CountryDetail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.loading);
  const CountryId = props.match.params.id;

  React.useEffect(() => {
    dispatch(actions.getDetailCountry(CountryId));
  }, [dispatch, CountryId]);

  const countryDetail = useSelector((state) => state.countryDetail);
  const {
    continent,
    flag_image,
    name,
    id,
    capital,
    subregion,
    area,
    population,
    activities,
  } = countryDetail;

  return (
    <div className="">
      {loading ? (
        <Loading />
      ) : Object.entries(countryDetail).length === 0 ? (
        <NotFound />
      ) : (
        <>
          {' '}
          <div className={styles.buttonBack}>
            <button onClick={() => history.goBack()}> ⬅BACK</button>
          </div>
          <div className={styles.container}>
            <div className={styles.card}>
              <div>
                <img
                  className={styles.headerImage}
                  src={flag_image}
                  alt="Default png"
                />
              </div>

              <div className={styles.cardBody}>
                <div className={styles.continentImage}>
                  <h1 className={styles.countryName}>{name.toUpperCase()}</h1>
                  {setContinentImg[continent]}
                </div>

                <h2 className={styles.continentName}>
                  {continent.toUpperCase()}
                </h2>

                <div className={styles.cardDetailOne}>
                  <div className={styles.cardChild}>
                    <h3 className={styles.cardText}>
                      COUNTRY ID: <p>{id}</p>{' '}
                    </h3>
                    <img
                      className={styles.imageCard}
                      src={flag_image}
                      alt="IMG"
                      width="38px"
                      height="35px"
                    />
                  </div>

                  <div className={styles.cardChild}>
                    <h3 className={styles.cardText}>
                      CAPITAL: <p> {capital}</p>{' '}
                    </h3>
                    <img
                      className={styles.imageCard}
                      src={location}
                      alt="IMG"
                      width="36px"
                      height="36px"
                    />
                  </div>
                </div>

                <div className={styles.cardDetailTwo}>
                  <div className={styles.cardChild}>
                    <h3 className={styles.cardText}>
                      SUBREGION: <p>{subregion ? subregion : 'None'} </p>
                    </h3>
                    <img
                      src={imgcontinents}
                      alt="IMG"
                      width="40px"
                      height="40px"
                    />
                  </div>

                  <div className={styles.cardChild}>
                    <h3 className={styles.cardText}>
                      AREA:{' '}
                      <p>
                        {' '}
                        {`${new Intl.NumberFormat('en-US').format(area)} km²`}
                      </p>
                    </h3>
                    <img
                      src={sqrmetters}
                      alt="IMG"
                      width="40px"
                      height="40px"
                    />
                  </div>
                </div>

                <div className={styles.cardDetailTwo}>
                  <div className={styles.cardChild}>
                    <div className={styles.populationInfo}>
                      Population:{' '}
                      <p>
                        {' '}
                        {new Intl.NumberFormat('en-US').format(population)}{' '}
                      </p>{' '}
                      ( {setPopulation(population)})
                    </div>
                  </div>
                </div>

                <h3 className={styles.activitiesTilttle}>ACTIVITIES</h3>
                <div className={styles.cardActivities}>
                  {activities.length ? (
                    activities?.map((tour) => (
                      <div className={styles.cardActivitiesChild}>
                        <h4>
                          ACTIVITY NAME: <p> {tour.name}</p>
                        </h4>
                        <h4>
                          DIFFICULTY:
                          <p>{`${tour.difficulty}/5`}</p>
                        </h4>
                        <h4>
                          DURATION:
                          <p> {tour.length_time}h.</p>
                        </h4>
                        <h4>
                          SEASON:
                          <p> {tour.season}</p>
                        </h4>
                      </div>
                    ))
                  ) : (
                    <div>
                      <div className={styles.cardActivitiesChildInfo}>
                        <h4>
                          No activities yet for this country, want to create
                          one?
                        </h4>
                        {/* <h4>Want to cr eate one?</h4> */}
                        <Link to={{ pathname: '/activities/create' }}>
                          <button className={styles.buttonDetail}>
                            Create Activity ▶
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CountryDetail;
