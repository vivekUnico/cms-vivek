const express = require("express");
const router = express.Router();

//routes
const center = require("./center");
const batch = require("./batch");

const subject = require("./subject");
const course = require("./course");

const timetable = require("./timetable/timetable");
const staff = require("./staff/staff");

const lead = require("./lead/lead");
const followup = require("./followup");

router.use('/center',center);

router.use('/batch',batch);
router.use('/subject',subject);
router.use('/course',course);

router.use('/timetable',timetable);

router.use('/lead',lead);
router.use('/followup',followup);

router.use('/staff',staff);

module.exports = router;