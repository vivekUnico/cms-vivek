const express = require("express");
const router = express.Router();

const { GetAllStudent, CreateStudent, GetSingleStudent, DeleteStudent, MoveEnquiryToStudent, StudentFees, StudentFeesAnalytics } = require("../../../controllers/student");

router.route('/').get(GetAllStudent)
router.route('/').post(CreateStudent)

router.route('/:id').get(GetSingleStudent)
router.route('/:id').delete(DeleteStudent)

router.route('/all/fees-status').get(StudentFees);
router.route('/all/fees-status/analytics').get(StudentFeesAnalytics);
router.route('/enquiry-to-student/:id').post(MoveEnquiryToStudent);


module.exports = router;