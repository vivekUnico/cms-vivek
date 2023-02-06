const express = require("express");
const router = express.Router();

const {
    CreateSubjectTimeTable, DeleteSubjectTimeTable, GetAllSubjectTimeTable, 
    GetSingleSubjectTimeTable, UpdateSubjectTimeTable, GetTimeTableBySubjectId, bulkUpdate
} = require('../../../controllers/timetable/SubjectTimeDetails.js');
router.route("/bulk/update").put(bulkUpdate);
router.route("/").get(GetAllSubjectTimeTable).post(CreateSubjectTimeTable);
router.route("/:id").get(GetSingleSubjectTimeTable).put(UpdateSubjectTimeTable)
    .delete(DeleteSubjectTimeTable);
router.route("/subject/:subjectId").get(GetTimeTableBySubjectId);

module.exports = router;