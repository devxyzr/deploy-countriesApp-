const axios = require("axios");
const e = require("express");
const { Country } = require("./db");

const REST_CONTRIES_API = `https://restcountries.com/v3.1/all`;

async function LoadDatabase() {
  try {
    {
      const response = await axios.get(REST_CONTRIES_API);
      const countries = response.data.map((e) => ({
        id: e.cca3,
        name: e.name.common,
        flag_image: e.flags.svg,
        continent: e.continents[0],
        capital: e.capital ? e.capital[0] : "No Capital",
        subregion: e.subregion ?? null,
        area: e.area,
        population: e.population,
      }));

      countries.forEach(async (country) => {
        await Country.findOrCreate({
          where: {
            id: country.id,
            name: country.name,
            flag_image: country.flag_image,
            continent: country.continent,
            capital: country.capital,
            subregion: country.subregion,
            area: country.area,
            population: country.population,
          },
        });
      });
    }

    console.log("DB SUCCESS");
  } catch (error) {
    return error;
  }

  //   console.log(response);
}

module.exports = { LoadDatabase };
