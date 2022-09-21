const express = require("express");
const router = express.Router();

const { CreateDateDetails, GetAllDateDetails, UpdateDateDetails, GetSingleDateDetails, DeleteSingleDateDetails } = require("../../../controllers/timetable/datedetails");

router.route('/:timetable').get(GetAllDateDetails)

router.route('/').post(CreateDateDetails)
router.route('/:id').put(UpdateDateDetails)
router.route('/:id').delete(DeleteSingleDateDetails)

router.route('/single/:id').get(GetSingleDateDetails)

module.exports = router;