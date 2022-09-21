const express = require("express");
const router = express.Router();

//router
const datedetails = require("./datedetails");
//controllers
const { CreateTimetable, GetAllTimetable, GetSingleTimetable, UpdateTimetable, DeleteSingleTimetable } = require("../../../controllers/timetable");

router.use("/datedetails",datedetails)

router.route('/').get(GetAllTimetable)
router.route('/').post(CreateTimetable)

router.route('/:id').get(GetSingleTimetable)
router.route('/:id').put(UpdateTimetable)
router.route('/:id').delete(DeleteSingleTimetable)



module.exports = router;