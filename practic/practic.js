const connectDB = require('../config/db.js');
const followup = require('../models/followup.js');
const leadAndEnquiry = require('../models/leadAndEnquiry/index.js');
const Permission = require('../models/Permissions.js');
const subject = require('../models/subject.js');
const course = require('../models/course.js');
const batch = require('../models/batch.js');
connectDB().then( async (db) => {
    await subject.deleteMany({ $or : [ {subject_id : "001"}, {subject_id : "002"}  ] });
    await course.deleteMany({ $or : [ {course_id : "001"}, {course_id : "002"}  ] });
    await batch.deleteMany({ $or : [ {batch_id : "001"}, {batch_id : "002"}  ] });
});