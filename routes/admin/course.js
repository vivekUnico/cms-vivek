const express = require("express");
const router = express.Router();

const { CreateCourse, GetAllCourse,GetSingleCourse, UpdateCourse, DeleteCourse } = require("../../controllers/course");

router.route('/').get(GetAllCourse)
router.route('/:id').get(GetSingleCourse)


router.route('/').post(CreateCourse)
router.route('/:id').put(UpdateCourse)
router.route('/:id').delete(DeleteCourse)


module.exports = router;