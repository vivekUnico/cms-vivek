const connectDB = require('../config/db.js');
const followup = require('../models/followup.js');
const leadAndEnquiry = require('../models/leadAndEnquiry/index.js');
const Permission = require('../models/Permissions.js');
const subject = require('../models/subject.js');
const course = require('../models/course.js');
connectDB().then( async (db) => {
    let result = await subject.find({ academic_year: 'master' }).sort({ createdAt: -1 })
        .skip((parseInt(1) - 1) * parseInt(10)).limit(parseInt(10));
    console.log(result);
});