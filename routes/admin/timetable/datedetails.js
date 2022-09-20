const express = require("express");
const router = express.Router();

const { CreateDateDetails, GetAllDateDetails, UpdateDateDetails, GetSingleDateDetails, DeleteSingleDateDetails } = require("../../../controllers/timetable/datedetails");

router.route('/').get(GetAllDateDetails)

router.route('/:id').get(GetSingleDateDetails)
router.route('/').post(CreateDateDetails)
router.route('/:id').put(UpdateDateDetails)
router.route('/:id').delete(DeleteSingleDateDetails)

module.exports = router;