import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../../redux/actions/index.actions';
import { deleteActivity } from '../../redux/actions/index.actions';
import { getAllActivities } from '../../redux/actions/index.actions';
import styles from './Activities.module.css';
import { Link } from 'react-router-dom';

const Activities = () => {
  const dispatch = useDispatch();
  const activitiesByCountries = useSelector((state) => state.activities);

  React.useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  // const handlerDelete = async (event, name) => {
  //   event.preventDefault();
  //   dispatch(deleteActivity(name));
  //   alert(`The activity ${name} has been deleted successfully`);
  // };

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const allActivities = [];
    let activitiesIds = [];

    activitiesByCountries?.map((countryActivity) => {
      if (countryActivity?.activities.length !== 0) {
        for (const activity of countryActivity.activities) {
          activity.countryName = countryActivity.name;
          activity.flagImage = countryActivity.flag_image;
          allActivities.push(activity);
          activitiesIds.push(activity.country_activity.activityId);
        }
      }
    });

    activitiesIds = activitiesIds.filter((value, index) => {
      return activitiesIds.indexOf(value) === index;
    });

    for (const [index, value] of activitiesIds.entries()) {
      activitiesIds[index] = {
        id: value,
        value: [],
      };
    }

    for (const activity of allActivities) {
      for (const activityId of activitiesIds) {
        if (activity.country_activity.activityId === activityId.id) {
          activityId.value.push(activity);
        }
      }
    }

    setActivities(activitiesIds);
  }, [activitiesByCountries]);

  return (
    <div className={styles.cardContainer}>
      {/* <div>
        <h1>ACTIVITIS AROUND THE WORLD</h1>
      </div> */}
      <div className={styles.cardActivities}>
        <div className={styles.cardActivitiesChildInfo}>
          <h4>
            ¡Create new activity <br /> for you country!
          </h4>
          {/* <h4>Want to cr eate one?</h4> */}
          <Link to={{ pathname: '/activities/create' }}>
            <button className={styles.buttonDetail}>Create Activity ▶</button>
          </Link>
        </div>

        {activities.map((activity) => {
          const { value } = activity;
          const { name, difficulty, length_time, season } = value[0];
          return (
            <div className={styles.cardActivitiesChild}>
              <h4>
                ACTIVITY:
                <p>{name}</p>
              </h4>

              <h4>
                {' '}
                DIFFICULTY:
                <p>{` ${difficulty}/5`}</p>
              </h4>

              <h4>
                DURATION:
                <p>{`${length_time}h.`}</p>
              </h4>

              <h4>
                SEASON:
                <p>{`${season}`}</p>
              </h4>

              <h4>COUNTRIES:</h4>
              <div className={styles.cardActivitiesChildCountry}>
                <Link to={`/countries`}>
                  {value?.map((countries) => {
                    return (
                      <div>
                        <p>{countries.countryName} ☑</p>
                        <img
                          className={styles.imageCard}
                          src={countries.flagImage}
                          alt="IMG"
                          width="33px"
                          height="33px"
                        />
                      </div>
                    );
                  })}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Activities;
