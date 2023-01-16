const express = require("express");
const router = express.Router();

const { CreateDateDetails, GetAllDateDetails, UpdateDateDetails, GetSingleDateDetails, DeleteSingleDateDetails, GetDateDetailsBySubject,
    AddLecture, UpdateLecture, DeleteLecture, AddActuals } = require("../../../controllers/timetable/datedetails");

router.route('/:timetable').get(GetAllDateDetails)

router.route('/').post(CreateDateDetails)
router.route('/:id').put(UpdateDateDetails)
router.route('/:id').delete(DeleteSingleDateDetails)

router.route('/single/:id').get(GetSingleDateDetails);

router.route('/lecture/:dateid').post(AddLecture);
router.route('/lecture/:id').put(UpdateLecture);
router.route('/lecture/:id').delete(DeleteLecture);

router.route('/actuals/:dateid').post(AddActuals);
router.route('/actuals/subject/:subjectId').get(GetDateDetailsBySubject);

module.exports = router;