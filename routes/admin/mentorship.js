const express = require("express");
const router = express.Router();

const { createMentorShip, deleteMentorShip, getMentorShip, getSingleMentorShip, updateMentorShip } = require("../../controllers/mentorshipAndSeminar/mentorship");

router.route('/').get(getMentorShip)
router.route('/:id').get(getSingleMentorShip)
router.route('/').post(createMentorShip)

router.route('/:id').put(updateMentorShip)
router.route('/:id').delete(deleteMentorShip)

module.exports = router;