const express = require("express");
const router = express.Router();

// User pre login controller s
const { createAssignment, deleteAssignment, getAllAssignment, getSingleAssignment, updateAssignment,
    createAssignmentSubmit, getAllAssignmentSubmission

} = require('../../controllers/testAssignment/assignment');

router.route('/').post(createAssignment);
router.route('/').get(getAllAssignment);
router.route('/:id').get(getSingleAssignment);
router.route('/:id').delete(deleteAssignment);
router.route('/:id').put(updateAssignment);

router.route('/submission/:id').post(createAssignmentSubmit);
router.route('/submission').get(getAllAssignmentSubmission);



module.exports = router;