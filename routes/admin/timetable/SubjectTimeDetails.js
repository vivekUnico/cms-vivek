const express = require("express");
const router = express.Router();

const {
    CreateSubjectTimeTable, DeleteSubjectTimeTable, GetAllSubjectTimeTable, 
    GetSingleSubjectTimeTable, UpdateSubjectTimeTable, GetTimeTableBySubjectId
} = require('../../../controllers/timetable/SubjectTimeDetails.js');

router.route("/").get(GetAllSubjectTimeTable).post(CreateSubjectTimeTable);
router.route("/:id").get(GetSingleSubjectTimeTable).put(UpdateSubjectTimeTable)
    .delete(DeleteSubjectTimeTable);
router.route("/subject/:subjectId").get(GetTimeTableBySubjectId);

module.exports = router;