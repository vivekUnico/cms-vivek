const express = require("express");
const router = express.Router();

//router
const datedetails = require("./datedetails");
//controllers
const { CreateTimetable, GetAllTimetable } = require("../../../controllers/timetable");

router.use("/datedetails",datedetails)

router.route('/').get(GetAllTimetable)
router.route('/').post(CreateTimetable)

module.exports = router;