const express = require("express");
const router = express.Router();

//routes
const center = require("./center");
const batch = require("./batch");

const subject = require("./subject");
const course = require("./course");

const timetable = require("./timetable/timetable");
const staff = require("./staff/staff");
const student = require("./student");

const emi = require("./emi");


const leadAndEnquiry = require("./leadAndEnquiry/leadAndEnquiry");
const followup = require("./followup");

const studymaterial = require("./studymaterial");

const librarybook = require("./librarybook");

const QuestionRouter = require("./qp");
const NotesRouter = require("./notes");

const MentorshipRouter = require("./mentorship");
const SeminarRouter = require("./seminar");

router.use('/center', center);

router.use('/batch', batch);
router.use('/subject', subject);
router.use('/course', course);

router.use('/timetable', timetable);
router.use('/lead-and-enquiry', leadAndEnquiry);
router.use('/followup', followup);

router.use('/staff', staff);
router.use('/student', student);

router.use('/emi', emi);

router.use('/studymaterial', studymaterial);

router.use('/library', librarybook);

router.use('/question', QuestionRouter);
router.use('/notes', NotesRouter);

router.use('/mentorship', MentorshipRouter);
router.use('/seminar', SeminarRouter);

module.exports = router;