const express = require("express");
const router = express.Router();

const { CreateFeedback, getFeedback, UpdateFeedback } = require("../../controllers/feedback/feedback");

router.route('/').get(getFeedback)
router.route('/').post(CreateFeedback)

router.route('/:id').put(UpdateFeedback)


module.exports = router;