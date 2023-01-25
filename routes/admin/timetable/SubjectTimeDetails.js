const express = require("express");
const router = express.Router();

const {
    CreateSubjectTimeTable, DeleteSubjectTimeTable, GetAllSubjectTimeTable, GetSingleSubjectTimeTable, UpdateSubjectTimeTable
} = require('../../../controllers/timetable/SubjectTimeDetails.js');

router.route("/").get(GetAllSubjectTimeTable).post(CreateSubjectTimeTable);
router.route("/:id").get(GetSingleSubjectTimeTable).put(UpdateSubjectTimeTable)
    .delete(DeleteSubjectTimeTable);

module.exports = router;