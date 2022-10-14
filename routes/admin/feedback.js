const express = require("express");
const router = express.Router();

const { CreateFeedback, getFeedback } = require("../../controllers/feedback/feedback");

router.route('/').get(getFeedback)
router.route('/').post(CreateFeedback)

module.exports = router;