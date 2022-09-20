const express = require("express");
const router = express.Router();

const { CreateDateDetails, GetAllDateDetails } = require("../../../controllers/timetable/datedetails");

router.route('/').get(GetAllDateDetails)
router.route('/').post(CreateDateDetails)

module.exports = router;