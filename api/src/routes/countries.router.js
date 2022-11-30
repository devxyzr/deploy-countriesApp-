const { Router } = require("express");

const {
  getCountriesWithActivities,
  findCountriesbyQuery,
  findCountriesbyId,
} = require("../controllers/countries.controller.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const countries = await getCountriesWithActivities();
    if (!name) {
      res.status(201).send(countries);
    } else {
      const filterCountries = findCountriesbyQuery(name, countries);
      res.status(201).send(filterCountries);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const countries = await getCountriesWithActivities();
    const filterCountriesId = findCountriesbyId(id, countries);
    res.status(201).send(filterCountriesId);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
