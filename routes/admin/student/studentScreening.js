const express = require("express");
const router = express.Router();

const { GetAllStudentScreening, UpdateStudentScreening } = require("../../../controllers/student/studentScreening");

router.route('/').get(GetAllStudentScreening)
router.route('/:id').put(UpdateStudentScreening)


module.exports = router;