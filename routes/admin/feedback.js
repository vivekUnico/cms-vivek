const express = require("express");
const router = express.Router();

const { CreateFeedback, getFeedback, UpdateFeedback, getFeedbackForStudent } = require("../../controllers/feedback/feedback");

router.route('/').get(getFeedback)
router.route('/student').get(getFeedbackForStudent)
router.route('/').post(CreateFeedback)

router.route('/:id').put(UpdateFeedback)


module.exports = router;