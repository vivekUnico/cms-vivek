const express = require("express");
const router = express.Router();

const { GetAllCourse, GetSingleCourse} = require("../../controllers/course");

router.route('/').get(GetAllCourse)
router.route('/:id').get(GetSingleCourse)


module.exports = router;