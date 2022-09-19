const express = require("express");
const router = express.Router();

const { CreateSubject, GetAllSubject, UpdateSubject,DeleteSubject, GetSingleSubject } = require("../../controllers/subject");

router.route('/').get(GetAllSubject)
router.route('/:id').get(GetSingleSubject)

router.route('/').post(CreateSubject)
router.route('/:id').put(UpdateSubject)
router.route('/:id').delete(DeleteSubject)


module.exports = router;