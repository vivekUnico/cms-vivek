const express = require("express");
const router = express.Router();

const center = require("./center");
const batch = require("./batch");

const subject = require("./subject");
const course = require("./course");

const timetable = require("./timetable/timetable");
const SubjectTimeDetails = require('./timetable/SubjectTimeDetails.js');
const staff = require("./staff/staff");
const student = require("./student");
const studentScreening = require("./student/studentScreening");

const emi = require("./emi");


const leadAndEnquiry = require("./leadAndEnquiry/leadAndEnquiry");
const LeadAutoMation = require("./LeadAutoMation");
const followup = require("./followup");

const studymaterial = require("./studymaterial");

const librarybook = require("./librarybook");
const PayrollRouter = require("./payroll/payroll.js");

const QuestionRouter = require("./testAssignement");
const AssignmentRouter = require("./assignment");
const NotesRouter = require("./notes");

const MentorshipRouter = require("./mentorship");
const SeminarRouter = require("./seminar");

const feedbackRouter = require("./feedback");
const attendanceRouter = require("./attendance");

const leavesRouter = require("./leave");
const adminSupportRouter = require("./adminsupport");
const communityRouter = require("./community");
const permissionRouter = require("./permission.js");
router.use("/SubjectTimeDetails", SubjectTimeDetails);
router.use('/center', center);

router.use('/batch', batch);
router.use('/subject', subject);
router.use('/course', course);

router.use('/timetable', timetable);
router.use('/lead-and-enquiry', leadAndEnquiry);
router.use('/followup', followup);

router.use('/staff', staff);
router.use('/student', student);
router.use('/student-screening', studentScreening);


router.use('/emi', emi);

router.use('/studymaterial', studymaterial);
router.use('/payroll', PayrollRouter);

router.use('/library', librarybook);

router.use('/test', QuestionRouter);
router.use('/assignment', AssignmentRouter);
router.use('/notes', NotesRouter);

router.use('/mentorship', MentorshipRouter);
router.use('/seminar', SeminarRouter);

router.use('/feedback', feedbackRouter);
router.use('/attendance', attendanceRouter);

router.use('/staff/leaves', leavesRouter);
router.use('/admin-support', adminSupportRouter);
router.use('/community', communityRouter);
router.use('/permission', permissionRouter);
router.use('/lead-automation', LeadAutoMation);


module.exports = router;