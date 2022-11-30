const { Router } = require('express');
const { Country, Activity } = require('../db');

const router = Router();

const getActivitieswithCountries = async function () {
  const data = await Country.findAll({
    include: [
      {
        model: Activity,
        attributes: ['name', 'difficulty', 'length_time', 'season'],
        through: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
  });
  return data;
};

const addActivitiestoCountry = async (
  name,
  difficulty,
  length_time,
  season,
  countries
) => {
  let newActivity = await Activity.create({
    name,
    difficulty,
    length_time,
    season,
  });

  console.log(newActivity);

  const countries_activity = await Country.findAll({
    where: {
      name: countries,
    },
  });
  console.log({ countries_activity });

  newActivity.addCountry(countries_activity);
};

// const getActivitieById = async function () {
//     const data = await Activity.findO
//     });
//     return data;
//   };

const deleteActivity = async (id) => {
  const activity = await Activity.findOne({ where: { id } });
  await activity.destroy();
};

module.exports = {
  getActivitieswithCountries,
  addActivitiestoCountry,
  deleteActivity,
};
