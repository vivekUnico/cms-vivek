const express = require("express");
const router = express.Router();

const { createStudyMaterial, deleteStudyMaterial, getStudyMaterial, updateStudyMaterial } = require("../../controllers/studymaterial/studymaterial");

router.route('/').get(getStudyMaterial)
router.route('/').post(createStudyMaterial)

router.route('/:id').put(updateStudyMaterial)
router.route('/:id').delete(deleteStudyMaterial)

module.exports = router;