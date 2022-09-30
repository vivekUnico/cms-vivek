const express = require("express");
const router = express.Router();

const { createSeminar, deleteSeminar, getSeminar, getSingleSeminar, updateSeminar, } = require("../../controllers/mentorshipAndSeminar/seminar");

router.route('/').get(getSeminar)
router.route('/:id').get(getSingleSeminar)
router.route('/').post(createSeminar)

router.route('/:id').put(updateSeminar)
router.route('/:id').delete(deleteSeminar)

module.exports = router;