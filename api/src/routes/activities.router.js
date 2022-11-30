const { Router } = require("express");

const {
  getActivitieswithCountries,
  addActivitiestoCountry,
  deleteActivity,
} = require("../controllers/activities.controller");

const { Country, Activity } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const activities = await getActivitieswithCountries();
    res.status(201).send(activities);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, difficulty, length_time, season, countries } = req.body;

    if (!name || !difficulty || !length_time || !season || !countries) {
      res.status(404).json("No se enviarion los datos necesarios en el body");
    } else {
      await addActivitiestoCountry(
        name,
        difficulty,
        length_time,
        season,
        countries
      );
      res.status(201).send("Se agrego la actividad correctamente");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    await deleteActivity(id);
    res.status(201).send("La actividad fue eliminada correctamente");
  } catch (error) {
    res.status(404).send("La actividad no pudo ser eliminada");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, difficulty, length_time, season, countries } = req.body;

    const activity_update = await Activity.findOne({ where: { id } }); // Agarra la actividad por el ID

    // PARAMAS ->> Objeto que se envia  la base de datos para que se actualizce
    let params = {
      name: name ?? activity_update.name,
      difficulty: difficulty ?? activity_update.difficulty,
      length_time: length_time ?? activity_update.length_time,
      season: season ?? activity_update.season,
      countries: countries ?? activity_update.countries,
    };

    activity_update.set(params);

    await activity_update.save();

    const countries_activity = await Country.findAll({
      where: {
        name: countries,
      },
    });

    activity_update.addCountry(countries_activity);

    res.status(201).send("La actividad fue actualizada");
  } catch (error) {
    res.status(404).send("La actividad no puedo ser actualizada");
    console.log(error);
  }
});

module.exports = router;
