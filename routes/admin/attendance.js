const express = require("express");
const router = express.Router();

const { CreateAttendance, getAttendance, UpdateAttendance } = require("../../controllers/attendance/attendance");

router.route('/').get(getAttendance)
router.route('/').post(CreateAttendance)

router.route('/:id').put(UpdateAttendance)


module.exports = router;