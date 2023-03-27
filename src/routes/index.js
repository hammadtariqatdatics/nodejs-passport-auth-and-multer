const { Router } = require("express");
// const { authHandler } = require('../middleware/auth');
const personRouter = require("./persons/person.controller");
const imagesRouter = require("./images/images.controller");

const router = Router();

router.use("/persons", personRouter);
router.use("/images", imagesRouter);

module.exports = router;
