// const { createZoomMeeting } = require("../utils/zoom");
// let zoomconfig = {
//     start_time : (new Date().toISOString()),
//     hostemail : "vivek.unicoglobal@gmail.com",
//     topic : "Maths",
//     duration : 60,
//     agenda: 'Online Lecture',
// }

// createZoomMeeting(zoomconfig).then((result) => {
//     console.log("got a result", result);
// }).catch(err => console.log("got an error", err));

// zqNYhHyom5pod7tz0MksG5LAnrVzyjCowXbU - secret

// 1EYt2ZxDQc6obqv5glD-Iw - key

// let date1 = new Date("2023-01-25T22:24:33.822Z");
// let date2 = new Date();
// console.log(date2 - date1);

const Config = require("../config/db");
// const staff = require("../models/staff");
// const course = require("../models/course");
const subjectTimeTable = require('../models/timetable/SubjectTimeDetails.js')
const LeadAndEnquiry = require("../models/leadAndEnquiry");
// const { default: axios } = require("axios");
const Feedback = require("../models/feedback");
// const Attendance = require("../models/attendance");
// const Assignment = require("../models/testsAssignment/assignment.js");
Config().then( async (result) => {
   await LeadAndEnquiry.deleteMany({
      mobile : "9389765436"
   });
}).catch(err => console.log("got an error", err));

