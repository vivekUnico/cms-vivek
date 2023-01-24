const connectDB = require('../config/db.js');
const followup = require('../models/followup.js');
const leadAndEnquiry = require('../models/leadAndEnquiry/index.js');
const Permission = require('../models/Permissions.js');
const subject = require('../models/subject.js');
const course = require('../models/course.js');
const batch = require('../models/batch.js');
const Student = require('../models/student/index.js');
const ManualEmi = require('../models/emi/manualEmi.js');
const Emi = require('../models/emi/index.js');
connectDB().then( async (db) => {
    // await subject.deleteMany({ $or : [ {subject_id : "001"}, {subject_id : "002"}  ] });
    // await course.deleteMany({ $or : [ {course_id : "001"}, {course_id : "002"}  ] });
    // await batch.deleteMany({ $or : [ {batch_id : "001"}, {batch_id : "002"}  ] });
    // await followup.deleteMany({});
    // await leadAndEnquiry.deleteMany({});
    // await Student.deleteMany({});
    // await ManualEmi.deleteMany({});
    // await Emi.deleteMany({});
    await Permission.updateMany({}, {
        $set : {
            all_subjects_curriculum : true,
            all_subjects_curriculum_filter : true,
            create_subjects_curriculum : true,
            edit_subjects_curriculum : true,
            delete_subjects_curriculum : true,
            view_subjects_curriculum : true,
            edit_topics_curriculum : true,
            delete_topics_curriculum : true,
            all_courses_curriculum : true,
            all_courses_curriculum_filter : true,
            create_courses_curriculum : true,
            edit_courses_curriculum : true,
            delete_courses_curriculum : true,
            view_courses_curriculum : true,
            all_batches_curriculum : true,
            all_batches_curriculum_filter : true,
            create_batches_curriculum : true,
            edit_batches_curriculum : true,
            delete_batches_curriculum : true,
            view_batches_curriculum : true,
            all_timetable : true,
            all_timetable_filter : true,
            create_timetable_lectures : true,
            edit_timetable_lectures : true,
            delete_timetable_lectures : true,
            view_timetable_lectures : true,
            add_actuals_timetable : true,
            add_assignment_timetable : true,
            add_feedback_timetable : true,
            add_attendance_timetable : true,
            edit_attendance_timetable : true,
            view_actuals_timetable : true,
            view_assignment_in_lecture_timetable : true,
            view_feedback_in_lecture_timetable : true,
            view_attendance_in_lecture_timetable : true,
        }
    })
});