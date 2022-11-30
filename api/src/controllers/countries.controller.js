const { Router } = require("express");
const { Country, Activity } = require("../db");

const router = Router();

const getCountriesWithActivities = async function () {
  const data = await Country.findAll({
    include: [
      {
        model: Activity,
        attributes: ["name", "difficulty", "length_time", "season"],
        through: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });
  return data;
};

const findCountriesbyQuery = (queryInfo, countries) => {
  let aux = {}; // Carga pais que encuentre con el nombre
  //   console.log({ queryInfo });
  for (let country of countries) {
    //Recorre todos los paises a ver si uno es igual al que entra por query
    if (country.name.toLowerCase() === queryInfo.toLowerCase()) {
      // Normaliza datos
      console.log(country);
      aux = country;
    }
  }
  if (Object.keys(aux).length === 0)
    throw new Error("No se encontro ningún pais XD");
  return aux;
};

const findCountriesbyId = (id, countries) => {
  const filteredCountry = countries.find(
    (country) => country.id.toLowerCase() === id.toLowerCase()
  );
  if (!filteredCountry)
    throw new Error("No se encontro ningún pais con el id ingresado");
  return filteredCountry;
};

module.exports = {
  getCountriesWithActivities,
  findCountriesbyQuery,
  findCountriesbyId,
};

// -------------------------------------------------------------------

// router.get("/countries", async (req, res) => {
//   const name = req.query.name;
//   const getCountries = await Country.findAll({
//     include: [
//       {
//         model: Activity,
//         attributes: [" name", "difficulty", " length_time", "season"],
//         through: { exclude: ["createdAt", "updatedAt"] },
//       },
//     ],
//   });
//   if (name) {
//   }
// });
