const express = require("express");
const router = express.Router();

const { CreateCourse, GetAllCourse, GetSingleCourse, UpdateCourse, DeleteCourse, AddCoursesInAY } = require("../../controllers/course");

router.route('/').get(GetAllCourse)
router.route('/').post(CreateCourse)

router.route('/:id').get(GetSingleCourse)
router.route('/:id').put(UpdateCourse)
router.route('/').put(AddCoursesInAY)
router.route('/:id').delete(DeleteCourse)


module.exports = router;