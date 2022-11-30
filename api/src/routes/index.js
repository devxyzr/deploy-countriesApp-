const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countries = require("./countries.router");
const activities = require("./activities.router");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", countries);
router.use("/activities", activities);

module.exports = router;
