const express = require("express");
const router = express.Router();

//routes
const center = require("./center");
const batch = require("./batch");

const subject = require("./subject");
const course = require("./course");

router.use('/center',center);
router.use('/batch',batch);

router.use('/subject',subject);
router.use('/course',course);

module.exports = router;