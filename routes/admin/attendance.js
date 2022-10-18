const express = require("express");
const router = express.Router();

const { CreateAttendance, getAttendance, UpdateAttendance, DeleteAttendance } = require("../../controllers/attendance/attendance");

router.route('/').get(getAttendance)
router.route('/').post(CreateAttendance)

router.route('/:id').put(UpdateAttendance)
router.route('/:id').delete(DeleteAttendance)


module.exports = router;