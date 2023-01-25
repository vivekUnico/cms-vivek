// const connectDB = require('../config/db.js');
// const followup = require('../models/followup.js');
// const leadAndEnquiry = require('../models/leadAndEnquiry/index.js');
// const Permission = require('../models/Permissions.js');
// const subject = require('../models/subject.js');
// const course = require('../models/course.js');
// const batch = require('../models/batch.js');
// const Student = require('../models/student/index.js');
// const ManualEmi = require('../models/emi/manualEmi.js');
// const Emi = require('../models/emi/index.js');
// connectDB().then( async (db) => {
//     // await subject.deleteMany({ $or : [ {subject_id : "001"}, {subject_id : "002"}  ] });
//     // await course.deleteMany({ $or : [ {course_id : "001"}, {course_id : "002"}  ] });
//     // await batch.deleteMany({ $or : [ {batch_id : "001"}, {batch_id : "002"}  ] });
//     // await followup.deleteMany({});
//     // await leadAndEnquiry.deleteMany({});
//     // await Student.deleteMany({});
//     // await ManualEmi.deleteMany({});
//     // await Emi.deleteMany({});
//     await Permission.updateMany({}, {
//         $set : {
//             all_subjects_curriculum : true,
//             all_subjects_curriculum_filter : true,
//             create_subjects_curriculum : true,
//             edit_subjects_curriculum : true,
//             delete_subjects_curriculum : true,
//             view_subjects_curriculum : true,
//             edit_topics_curriculum : true,
//             delete_topics_curriculum : true,
//             all_courses_curriculum : true,
//             all_courses_curriculum_filter : true,
//             create_courses_curriculum : true,
//             edit_courses_curriculum : true,
//             delete_courses_curriculum : true,
//             view_courses_curriculum : true,
//             all_batches_curriculum : true,
//             all_batches_curriculum_filter : true,
//             create_batches_curriculum : true,
//             edit_batches_curriculum : true,
//             delete_batches_curriculum : true,
//             view_batches_curriculum : true,
//             all_timetable : true,
//             all_timetable_filter : true,
//             create_timetable_lectures : true,
//             edit_timetable_lectures : true,
//             delete_timetable_lectures : true,
//             view_timetable_lectures : true,
//             add_actuals_timetable : true,
//             add_assignment_timetable : true,
//             add_feedback_timetable : true,
//             add_attendance_timetable : true,
//             edit_attendance_timetable : true,
//             view_actuals_timetable : true,
//             view_assignment_in_lecture_timetable : true,
//             view_feedback_in_lecture_timetable : true,
//             view_attendance_in_lecture_timetable : true,
//         }
//     })
// });
{
    "success": true,
    "data": [
        {
            "_id": "636b8cfd00b4e2d19e179c70",
            "timetable": {
                "_id": "636b8cfc00b4e2d19e179c63",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "6346834b9dfb0b8839e242bc",
                    "name": "LNG COURSE",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "639982c3ee7c0fa4710f72da",
                        "639064e0d82a752282108b39",
                        "639042b16b8a6847d89b6df8",
                        "63872a728297b7bbca2a240b"
                    ],
                    "description": "Edit batch",
                    "batch_id": "dfF21",
                    "batch_date": {
                        "start_date": "2022-09-30T18:30:00.000Z",
                        "end_date": "2022-10-30T18:30:00.000Z"
                    },
                    "createdAt": "2022-10-12T09:05:15.413Z",
                    "updatedAt": "2023-01-06T08:44:17.805Z",
                    "__v": 0
                },
                "start_date": "2022-11-08T18:30:00.000Z",
                "end_date": "2022-11-09T18:30:00.000Z",
                "createdAt": "2022-11-09T11:20:28.378Z",
                "updatedAt": "2022-11-09T11:20:28.378Z",
                "__v": 0
            },
            "date": "2022-11-08T18:30:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2022-11-09T10:30:00.000Z",
                "end_time": "2022-11-09T11:30:00.000Z",
                "subject": {
                    "_id": "63453c46e60c0d87f558ce2e",
                    "name": "History",
                    "courses": [
                        "63453c46e60c0d87f558ce33"
                    ],
                    "topics": [
                        {
                            "name": "british",
                            "status": "false",
                            "_id": "6351392e6cc3bf3155d29139"
                        },
                        {
                            "name": "dutch",
                            "status": "false",
                            "_id": "6351392e6cc3bf3155d2913a"
                        },
                        {
                            "name": "independence",
                            "status": "false",
                            "_id": "6351392e6cc3bf3155d2913b"
                        },
                        {
                            "name": "NEWHIST",
                            "status": "false",
                            "_id": "6351392e6cc3bf3155d2913c"
                        },
                        {
                            "name": "22exclusive",
                            "status": "false",
                            "_id": "6351392e6cc3bf3155d2913d"
                        }
                    ],
                    "description": "This is test histyr subej",
                    "subject_id": "HST",
                    "master_id": "63453b99e60c0d87f558cda3",
                    "academic_year": "2022",
                    "createdAt": "2022-10-11T09:49:58.832Z",
                    "updatedAt": "2023-01-13T22:47:35.319Z",
                    "__v": 0,
                    "year_version": [
                        "master"
                    ]
                },
                "topics": [
                    "6351392e6cc3bf3155d29139"
                ],
                "teacher": "632d9ee754fd162cb1cb7372",
                "zoom_link": "https://us04web.zoom.us/s/75644008368?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc1NjQ0MDA4MzY4IiwiZXhwIjoxNjY4MDAwMDI4LCJpYXQiOjE2Njc5OTI4MjgsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.e0nSFnvOwxvb0q76Va9nw_FZFq76JW9aQDI9QvFdSsw",
                "_id": "636b8cfd00b4e2d19e179c71"
            },
            "actuals_details": [],
            "createdAt": "2022-11-09T11:20:29.284Z",
            "updatedAt": "2022-11-09T11:20:29.284Z",
            "__v": 0
        },
        {
            "_id": "636b8cfd00b4e2d19e179c72",
            "timetable": {
                "_id": "636b8cfc00b4e2d19e179c63",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "6346834b9dfb0b8839e242bc",
                    "name": "LNG COURSE",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "639982c3ee7c0fa4710f72da",
                        "639064e0d82a752282108b39",
                        "639042b16b8a6847d89b6df8",
                        "63872a728297b7bbca2a240b"
                    ],
                    "description": "Edit batch",
                    "batch_id": "dfF21",
                    "batch_date": {
                        "start_date": "2022-09-30T18:30:00.000Z",
                        "end_date": "2022-10-30T18:30:00.000Z"
                    },
                    "createdAt": "2022-10-12T09:05:15.413Z",
                    "updatedAt": "2023-01-06T08:44:17.805Z",
                    "__v": 0
                },
                "start_date": "2022-11-08T18:30:00.000Z",
                "end_date": "2022-11-09T18:30:00.000Z",
                "createdAt": "2022-11-09T11:20:28.378Z",
                "updatedAt": "2022-11-09T11:20:28.378Z",
                "__v": 0
            },
            "date": "2022-11-09T18:30:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2022-11-10T10:30:00.000Z",
                "end_time": "2022-11-10T11:30:00.000Z",
                "subject": {
                    "_id": "634682ff9dfb0b8839e24229",
                    "name": "ENGLISH",
                    "courses": [
                        "634683009dfb0b8839e24236",
                        "63c06519edf5f283d1b60ebf"
                    ],
                    "topics": [
                        {
                            "name": "verb",
                            "status": "false",
                            "_id": "63453bb5e60c0d87f558cdae"
                        },
                        {
                            "name": "adjaective",
                            "status": "false",
                            "_id": "63453bb5e60c0d87f558cdaf"
                        },
                        {
                            "name": "punctutauin",
                            "status": "false",
                            "_id": "63453bb5e60c0d87f558cdb0"
                        },
                        {
                            "name": "grammer",
                            "status": "false",
                            "_id": "63453bb5e60c0d87f558cdb1"
                        }
                    ],
                    "description": "asjhndfjkan fkmsdnfks",
                    "subject_id": "ENG",
                    "master_id": "63453bb5e60c0d87f558cdad",
                    "academic_year": "2022",
                    "createdAt": "2022-10-12T09:03:59.667Z",
                    "updatedAt": "2023-01-13T22:47:35.319Z",
                    "__v": 0,
                    "year_version": [
                        "master"
                    ]
                },
                "topics": [
                    "63453bb5e60c0d87f558cdaf"
                ],
                "teacher": "632d9a8e54fd162cb1cb7330",
                "zoom_link": "https://us04web.zoom.us/s/79838968951?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc5ODM4OTY4OTUxIiwiZXhwIjoxNjY4MDAwMDI5LCJpYXQiOjE2Njc5OTI4MjksImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.flo9pmpvVGO0gznL5mVVVBTKBw7Vh6t2pYl6KVYv8vQ",
                "_id": "636b8cfd00b4e2d19e179c73"
            },
            "actuals_details": [],
            "createdAt": "2022-11-09T11:20:29.284Z",
            "updatedAt": "2023-01-17T11:12:26.355Z",
            "__v": 0,
            "status": "Cancelled"
        },
        {
            "_id": "636b91f600b4e2d19e179e64",
            "timetable": {
                "_id": "636b8cfc00b4e2d19e179c63",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "6346834b9dfb0b8839e242bc",
                    "name": "LNG COURSE",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "639982c3ee7c0fa4710f72da",
                        "639064e0d82a752282108b39",
                        "639042b16b8a6847d89b6df8",
                        "63872a728297b7bbca2a240b"
                    ],
                    "description": "Edit batch",
                    "batch_id": "dfF21",
                    "batch_date": {
                        "start_date": "2022-09-30T18:30:00.000Z",
                        "end_date": "2022-10-30T18:30:00.000Z"
                    },
                    "createdAt": "2022-10-12T09:05:15.413Z",
                    "updatedAt": "2023-01-06T08:44:17.805Z",
                    "__v": 0
                },
                "start_date": "2022-11-08T18:30:00.000Z",
                "end_date": "2022-11-09T18:30:00.000Z",
                "createdAt": "2022-11-09T11:20:28.378Z",
                "updatedAt": "2022-11-09T11:20:28.378Z",
                "__v": 0
            },
            "date": "2022-11-11T18:30:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2022-11-12T11:30:00.000Z",
                "end_time": "2022-11-12T12:30:00.000Z",
                "subject": {
                    "_id": "63453c46e60c0d87f558ce2e",
                    "name": "History",
                    "courses": [
                        "63453c46e60c0d87f558ce33"
                    ],
                    "topics": [
                        {
                            "name": "british",
                            "status": "false",
                            "_id": "6351392e6cc3bf3155d29139"
                        },
                        {
                            "name": "dutch",
                            "status": "false",
                            "_id": "6351392e6cc3bf3155d2913a"
                        },
                        {
                            "name": "independence",
                            "status": "false",
                            "_id": "6351392e6cc3bf3155d2913b"
                        },
                        {
                            "name": "NEWHIST",
                            "status": "false",
                            "_id": "6351392e6cc3bf3155d2913c"
                        },
                        {
                            "name": "22exclusive",
                            "status": "false",
                            "_id": "6351392e6cc3bf3155d2913d"
                        }
                    ],
                    "description": "This is test histyr subej",
                    "subject_id": "HST",
                    "master_id": "63453b99e60c0d87f558cda3",
                    "academic_year": "2022",
                    "createdAt": "2022-10-11T09:49:58.832Z",
                    "updatedAt": "2023-01-13T22:47:35.319Z",
                    "__v": 0,
                    "year_version": [
                        "master"
                    ]
                },
                "topics": [
                    "6351392e6cc3bf3155d29139"
                ],
                "teacher": "632d9a8e54fd162cb1cb7330",
                "zoom_link": "https://us04web.zoom.us/s/78255657781?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc4MjU1NjU3NzgxIiwiZXhwIjoxNjY4MDAxMzAwLCJpYXQiOjE2Njc5OTQxMDAsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.zHQx1ZzAGnbDetpSl9jm0Dn0RHNAYybdfzVu9rPtEZA",
                "_id": "636b91f600b4e2d19e179e65"
            },
            "actuals_details": [],
            "createdAt": "2022-11-09T11:41:42.624Z",
            "updatedAt": "2022-11-09T11:41:42.624Z",
            "__v": 0
        },
        {
            "_id": "636b91f600b4e2d19e179e64",
            "timetable": {
                "_id": "636b8cfc00b4e2d19e179c63",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "6346834b9dfb0b8839e242bc",
                    "name": "LNG COURSE",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "639982c3ee7c0fa4710f72da",
                        "639064e0d82a752282108b39",
                        "639042b16b8a6847d89b6df8",
                        "63872a728297b7bbca2a240b"
                    ],
                    "description": "Edit batch",
                    "batch_id": "dfF21",
                    "batch_date": {
                        "start_date": "2022-09-30T18:30:00.000Z",
                        "end_date": "2022-10-30T18:30:00.000Z"
                    },
                    "createdAt": "2022-10-12T09:05:15.413Z",
                    "updatedAt": "2023-01-06T08:44:17.805Z",
                    "__v": 0
                },
                "start_date": "2022-11-08T18:30:00.000Z",
                "end_date": "2022-11-09T18:30:00.000Z",
                "createdAt": "2022-11-09T11:20:28.378Z",
                "updatedAt": "2022-11-09T11:20:28.378Z",
                "__v": 0
            },
            "date": "2022-11-11T18:30:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2022-11-12T12:30:00.000Z",
                "end_time": "2022-11-12T13:30:00.000Z",
                "subject": {
                    "_id": "634682ff9dfb0b8839e24229",
                    "name": "ENGLISH",
                    "courses": [
                        "634683009dfb0b8839e24236",
                        "63c06519edf5f283d1b60ebf"
                    ],
                    "topics": [
                        {
                            "name": "verb",
                            "status": "false",
                            "_id": "63453bb5e60c0d87f558cdae"
                        },
                        {
                            "name": "adjaective",
                            "status": "false",
                            "_id": "63453bb5e60c0d87f558cdaf"
                        },
                        {
                            "name": "punctutauin",
                            "status": "false",
                            "_id": "63453bb5e60c0d87f558cdb0"
                        },
                        {
                            "name": "grammer",
                            "status": "false",
                            "_id": "63453bb5e60c0d87f558cdb1"
                        }
                    ],
                    "description": "asjhndfjkan fkmsdnfks",
                    "subject_id": "ENG",
                    "master_id": "63453bb5e60c0d87f558cdad",
                    "academic_year": "2022",
                    "createdAt": "2022-10-12T09:03:59.667Z",
                    "updatedAt": "2023-01-13T22:47:35.319Z",
                    "__v": 0,
                    "year_version": [
                        "master"
                    ]
                },
                "topics": [
                    "63453bb5e60c0d87f558cdaf"
                ],
                "teacher": "6338053b8fdcd2706c61ea1a",
                "zoom_link": "https://us04web.zoom.us/s/76819324609?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc2ODE5MzI0NjA5IiwiZXhwIjoxNjY4MDAxMzAxLCJpYXQiOjE2Njc5OTQxMDEsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.a9MeZsJQ5Z2XF_-UBnJxvvKjQVdZQ9jJ_OY583mSvGY",
                "_id": "636b91f600b4e2d19e179e66"
            },
            "actuals_details": [],
            "createdAt": "2022-11-09T11:41:42.624Z",
            "updatedAt": "2022-11-09T11:41:42.624Z",
            "__v": 0
        },
        {
            "_id": "636b91f600b4e2d19e179e64",
            "timetable": {
                "_id": "636b8cfc00b4e2d19e179c63",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "6346834b9dfb0b8839e242bc",
                    "name": "LNG COURSE",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "639982c3ee7c0fa4710f72da",
                        "639064e0d82a752282108b39",
                        "639042b16b8a6847d89b6df8",
                        "63872a728297b7bbca2a240b"
                    ],
                    "description": "Edit batch",
                    "batch_id": "dfF21",
                    "batch_date": {
                        "start_date": "2022-09-30T18:30:00.000Z",
                        "end_date": "2022-10-30T18:30:00.000Z"
                    },
                    "createdAt": "2022-10-12T09:05:15.413Z",
                    "updatedAt": "2023-01-06T08:44:17.805Z",
                    "__v": 0
                },
                "start_date": "2022-11-08T18:30:00.000Z",
                "end_date": "2022-11-09T18:30:00.000Z",
                "createdAt": "2022-11-09T11:20:28.378Z",
                "updatedAt": "2022-11-09T11:20:28.378Z",
                "__v": 0
            },
            "date": "2022-11-11T18:30:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2022-11-12T13:30:00.000Z",
                "end_time": "2022-11-12T14:30:00.000Z",
                "subject": {
                    "_id": "634683009dfb0b8839e24232",
                    "name": "HIndi",
                    "courses": [
                        "634683009dfb0b8839e24236",
                        "634ec87de1f5e80ea4139bbe"
                    ],
                    "topics": [
                        {
                            "name": "verb",
                            "status": "false",
                            "_id": "635174f28fcbc426340bfc2b"
                        },
                        {
                            "name": "ajdevtive",
                            "status": "false",
                            "_id": "635174f28fcbc426340bfc2c"
                        },
                        {
                            "name": "grammer",
                            "status": "false",
                            "_id": "635174f28fcbc426340bfc2d"
                        },
                        {
                            "name": "artivles",
                            "status": "false",
                            "_id": "635174f28fcbc426340bfc2e"
                        },
                        {
                            "name": "essays",
                            "status": "false",
                            "_id": "635174f28fcbc426340bfc2f"
                        },
                        {
                            "name": "lettsrs",
                            "status": "false",
                            "_id": "635174f28fcbc426340bfc30"
                        }
                    ],
                    "description": "THis ist est",
                    "subject_id": "HND",
                    "master_id": "6346829a9dfb0b8839e241db",
                    "academic_year": "2022",
                    "createdAt": "2022-10-12T09:04:00.064Z",
                    "updatedAt": "2023-01-13T22:47:35.319Z",
                    "__v": 0,
                    "year_version": [
                        "master"
                    ]
                },
                "topics": [
                    "635174f28fcbc426340bfc2b"
                ],
                "teacher": "632da12154fd162cb1cb7381",
                "zoom_link": "https://us04web.zoom.us/s/73026234555?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6IjczMDI2MjM0NTU1IiwiZXhwIjoxNjY4MDAxMzAyLCJpYXQiOjE2Njc5OTQxMDIsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.8EF1yY6d0XQkkA3NjKn2lqhGD3YqLl1-ER1xuK54QuI",
                "_id": "636b91f600b4e2d19e179e67"
            },
            "actuals_details": [],
            "createdAt": "2022-11-09T11:41:42.624Z",
            "updatedAt": "2022-11-09T11:41:42.624Z",
            "__v": 0
        },
        {
            "_id": "636b91f600b4e2d19e179e69",
            "timetable": {
                "_id": "636b8cfc00b4e2d19e179c63",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "6346834b9dfb0b8839e242bc",
                    "name": "LNG COURSE",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "639982c3ee7c0fa4710f72da",
                        "639064e0d82a752282108b39",
                        "639042b16b8a6847d89b6df8",
                        "63872a728297b7bbca2a240b"
                    ],
                    "description": "Edit batch",
                    "batch_id": "dfF21",
                    "batch_date": {
                        "start_date": "2022-09-30T18:30:00.000Z",
                        "end_date": "2022-10-30T18:30:00.000Z"
                    },
                    "createdAt": "2022-10-12T09:05:15.413Z",
                    "updatedAt": "2023-01-06T08:44:17.805Z",
                    "__v": 0
                },
                "start_date": "2022-11-08T18:30:00.000Z",
                "end_date": "2022-11-09T18:30:00.000Z",
                "createdAt": "2022-11-09T11:20:28.378Z",
                "updatedAt": "2022-11-09T11:20:28.378Z",
                "__v": 0
            },
            "date": "2022-11-13T18:30:00.000Z",
            "date_type": "holiday",
            "lecture_type": "online",
            "time_details": {},
            "actuals_details": [],
            "createdAt": "2022-11-09T11:41:42.624Z",
            "updatedAt": "2022-11-09T11:41:42.624Z",
            "__v": 0
        },
        {
            "_id": "636b91f600b4e2d19e179e68",
            "timetable": {
                "_id": "636b8cfc00b4e2d19e179c63",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "6346834b9dfb0b8839e242bc",
                    "name": "LNG COURSE",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "639982c3ee7c0fa4710f72da",
                        "639064e0d82a752282108b39",
                        "639042b16b8a6847d89b6df8",
                        "63872a728297b7bbca2a240b"
                    ],
                    "description": "Edit batch",
                    "batch_id": "dfF21",
                    "batch_date": {
                        "start_date": "2022-09-30T18:30:00.000Z",
                        "end_date": "2022-10-30T18:30:00.000Z"
                    },
                    "createdAt": "2022-10-12T09:05:15.413Z",
                    "updatedAt": "2023-01-06T08:44:17.805Z",
                    "__v": 0
                },
                "start_date": "2022-11-08T18:30:00.000Z",
                "end_date": "2022-11-09T18:30:00.000Z",
                "createdAt": "2022-11-09T11:20:28.378Z",
                "updatedAt": "2022-11-09T11:20:28.378Z",
                "__v": 0
            },
            "date": "2022-11-12T18:30:00.000Z",
            "date_type": "holiday",
            "lecture_type": "online",
            "time_details": {},
            "actuals_details": [],
            "createdAt": "2022-11-09T11:41:42.624Z",
            "updatedAt": "2022-11-09T11:41:42.624Z",
            "__v": 0
        },
        {
            "_id": "6388a285dcbb99b8ed1a6d7a",
            "timetable": {
                "_id": "6388a282dcbb99b8ed1a6d5e",
                "batch": {
                    "_id": "6388a1bfdcbb99b8ed1a6ce3",
                    "name": "black ops",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63ac7029279a26e4e47d2fd2",
                        "639064e0d82a752282108b39",
                        "639042b16b8a6847d89b6df8",
                        "63872a728297b7bbca2a240b",
                        "635931edd1dee7910c88280c"
                    ],
                    "description": "descripitoin",
                    "batch_id": "7860",
                    "batch_date": {
                        "start_date": "2022-12-14T18:30:00.000Z"
                    },
                    "createdAt": "2022-12-01T12:44:47.088Z",
                    "updatedAt": "2023-01-06T08:43:56.247Z",
                    "__v": 0
                },
                "start_date": "2022-12-09T18:30:00.000Z",
                "end_date": "2022-12-14T18:30:00.000Z",
                "createdAt": "2022-12-01T12:48:02.957Z",
                "updatedAt": "2022-12-01T12:48:02.957Z",
                "__v": 0
            },
            "date": "2022-12-09T18:30:00.000Z",
            "date_type": "holiday",
            "lecture_type": "online",
            "time_details": {},
            "actuals_details": [],
            "createdAt": "2022-12-01T12:48:05.535Z",
            "updatedAt": "2022-12-01T12:48:05.535Z",
            "__v": 0
        },
        {
            "_id": "6388a285dcbb99b8ed1a6d7f",
            "timetable": {
                "_id": "6388a282dcbb99b8ed1a6d5e",
                "batch": {
                    "_id": "6388a1bfdcbb99b8ed1a6ce3",
                    "name": "black ops",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63ac7029279a26e4e47d2fd2",
                        "639064e0d82a752282108b39",
                        "639042b16b8a6847d89b6df8",
                        "63872a728297b7bbca2a240b",
                        "635931edd1dee7910c88280c"
                    ],
                    "description": "descripitoin",
                    "batch_id": "7860",
                    "batch_date": {
                        "start_date": "2022-12-14T18:30:00.000Z"
                    },
                    "createdAt": "2022-12-01T12:44:47.088Z",
                    "updatedAt": "2023-01-06T08:43:56.247Z",
                    "__v": 0
                },
                "start_date": "2022-12-09T18:30:00.000Z",
                "end_date": "2022-12-14T18:30:00.000Z",
                "createdAt": "2022-12-01T12:48:02.957Z",
                "updatedAt": "2022-12-01T12:48:02.957Z",
                "__v": 0
            },
            "date": "2022-12-12T18:30:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2022-12-13T12:30:00.000Z",
                "end_time": "2022-12-13T13:30:00.000Z",
                "subject": {
                    "_id": "634683009dfb0b8839e24232",
                    "name": "HIndi",
                    "courses": [
                        "634683009dfb0b8839e24236",
                        "634ec87de1f5e80ea4139bbe"
                    ],
                    "topics": [
                        {
                            "name": "verb",
                            "status": "false",
                            "_id": "635174f28fcbc426340bfc2b"
                        },
                        {
                            "name": "ajdevtive",
                            "status": "false",
                            "_id": "635174f28fcbc426340bfc2c"
                        },
                        {
                            "name": "grammer",
                            "status": "false",
                            "_id": "635174f28fcbc426340bfc2d"
                        },
                        {
                            "name": "artivles",
                            "status": "false",
                            "_id": "635174f28fcbc426340bfc2e"
                        },
                        {
                            "name": "essays",
                            "status": "false",
                            "_id": "635174f28fcbc426340bfc2f"
                        },
                        {
                            "name": "lettsrs",
                            "status": "false",
                            "_id": "635174f28fcbc426340bfc30"
                        }
                    ],
                    "description": "THis ist est",
                    "subject_id": "HND",
                    "master_id": "6346829a9dfb0b8839e241db",
                    "academic_year": "2022",
                    "createdAt": "2022-10-12T09:04:00.064Z",
                    "updatedAt": "2023-01-13T22:47:35.319Z",
                    "__v": 0,
                    "year_version": [
                        "master"
                    ]
                },
                "topics": [
                    "635174f28fcbc426340bfc2d"
                ],
                "teacher": "632d9ee754fd162cb1cb7372",
                "zoom_link": "https://us04web.zoom.us/s/77104025443?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc3MTA0MDI1NDQzIiwiZXhwIjoxNjY5OTA2MDg0LCJpYXQiOjE2Njk4OTg4ODQsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.7NxIalVXz1FeiXyM225MOdzerzCJlrjJXQjqXt6YsHA",
                "_id": "6388a285dcbb99b8ed1a6d80"
            },
            "actuals_details": [],
            "createdAt": "2022-12-01T12:48:05.539Z",
            "updatedAt": "2022-12-01T12:48:05.539Z",
            "__v": 0
        },
        {
            "_id": "6388a285dcbb99b8ed1a6d84",
            "timetable": {
                "_id": "6388a282dcbb99b8ed1a6d5e",
                "batch": {
                    "_id": "6388a1bfdcbb99b8ed1a6ce3",
                    "name": "black ops",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63ac7029279a26e4e47d2fd2",
                        "639064e0d82a752282108b39",
                        "639042b16b8a6847d89b6df8",
                        "63872a728297b7bbca2a240b",
                        "635931edd1dee7910c88280c"
                    ],
                    "description": "descripitoin",
                    "batch_id": "7860",
                    "batch_date": {
                        "start_date": "2022-12-14T18:30:00.000Z"
                    },
                    "createdAt": "2022-12-01T12:44:47.088Z",
                    "updatedAt": "2023-01-06T08:43:56.247Z",
                    "__v": 0
                },
                "start_date": "2022-12-09T18:30:00.000Z",
                "end_date": "2022-12-14T18:30:00.000Z",
                "createdAt": "2022-12-01T12:48:02.957Z",
                "updatedAt": "2022-12-01T12:48:02.957Z",
                "__v": 0
            },
            "date": "2022-12-14T18:30:00.000Z",
            "date_type": "holiday",
            "lecture_type": "online",
            "time_details": {},
            "actuals_details": [],
            "createdAt": "2022-12-01T12:48:05.535Z",
            "updatedAt": "2022-12-01T12:48:05.535Z",
            "__v": 0
        },
        {
            "_id": "6388a285dcbb99b8ed1a6d7b",
            "timetable": {
                "_id": "6388a282dcbb99b8ed1a6d5e",
                "batch": {
                    "_id": "6388a1bfdcbb99b8ed1a6ce3",
                    "name": "black ops",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63ac7029279a26e4e47d2fd2",
                        "639064e0d82a752282108b39",
                        "639042b16b8a6847d89b6df8",
                        "63872a728297b7bbca2a240b",
                        "635931edd1dee7910c88280c"
                    ],
                    "description": "descripitoin",
                    "batch_id": "7860",
                    "batch_date": {
                        "start_date": "2022-12-14T18:30:00.000Z"
                    },
                    "createdAt": "2022-12-01T12:44:47.088Z",
                    "updatedAt": "2023-01-06T08:43:56.247Z",
                    "__v": 0
                },
                "start_date": "2022-12-09T18:30:00.000Z",
                "end_date": "2022-12-14T18:30:00.000Z",
                "createdAt": "2022-12-01T12:48:02.957Z",
                "updatedAt": "2022-12-01T12:48:02.957Z",
                "__v": 0
            },
            "date": "2022-12-10T18:30:00.000Z",
            "date_type": "holiday",
            "lecture_type": "online",
            "time_details": {},
            "actuals_details": [],
            "createdAt": "2022-12-01T12:48:05.535Z",
            "updatedAt": "2022-12-01T12:48:05.535Z",
            "__v": 0
        },
        {
            "_id": "6388a285dcbb99b8ed1a6d7c",
            "timetable": {
                "_id": "6388a282dcbb99b8ed1a6d5e",
                "batch": {
                    "_id": "6388a1bfdcbb99b8ed1a6ce3",
                    "name": "black ops",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63ac7029279a26e4e47d2fd2",
                        "639064e0d82a752282108b39",
                        "639042b16b8a6847d89b6df8",
                        "63872a728297b7bbca2a240b",
                        "635931edd1dee7910c88280c"
                    ],
                    "description": "descripitoin",
                    "batch_id": "7860",
                    "batch_date": {
                        "start_date": "2022-12-14T18:30:00.000Z"
                    },
                    "createdAt": "2022-12-01T12:44:47.088Z",
                    "updatedAt": "2023-01-06T08:43:56.247Z",
                    "__v": 0
                },
                "start_date": "2022-12-09T18:30:00.000Z",
                "end_date": "2022-12-14T18:30:00.000Z",
                "createdAt": "2022-12-01T12:48:02.957Z",
                "updatedAt": "2022-12-01T12:48:02.957Z",
                "__v": 0
            },
            "date": "2022-12-11T18:30:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2022-12-12T12:30:00.000Z",
                "end_time": "2022-12-12T13:30:00.000Z",
                "subject": {
                    "_id": "63453c46e60c0d87f558ce2e",
                    "name": "History",
                    "courses": [
                        "63453c46e60c0d87f558ce33"
                    ],
                    "topics": [
                        {
                            "name": "british",
                            "status": "false",
                            "_id": "6351392e6cc3bf3155d29139"
                        },
                        {
                            "name": "dutch",
                            "status": "false",
                            "_id": "6351392e6cc3bf3155d2913a"
                        },
                        {
                            "name": "independence",
                            "status": "false",
                            "_id": "6351392e6cc3bf3155d2913b"
                        },
                        {
                            "name": "NEWHIST",
                            "status": "false",
                            "_id": "6351392e6cc3bf3155d2913c"
                        },
                        {
                            "name": "22exclusive",
                            "status": "false",
                            "_id": "6351392e6cc3bf3155d2913d"
                        }
                    ],
                    "description": "This is test histyr subej",
                    "subject_id": "HST",
                    "master_id": "63453b99e60c0d87f558cda3",
                    "academic_year": "2022",
                    "createdAt": "2022-10-11T09:49:58.832Z",
                    "updatedAt": "2023-01-13T22:47:35.319Z",
                    "__v": 0,
                    "year_version": [
                        "master"
                    ]
                },
                "topics": [
                    "6351392e6cc3bf3155d2913a"
                ],
                "teacher": "632d9ee754fd162cb1cb7372",
                "zoom_link": "https://us04web.zoom.us/s/75280667302?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc1MjgwNjY3MzAyIiwiZXhwIjoxNjY5OTA2MDgzLCJpYXQiOjE2Njk4OTg4ODMsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.5MruyCzt86zsaiA-FnmAnxNE2ls4gVYIqsGf8H29YmM",
                "_id": "6388a285dcbb99b8ed1a6d7d"
            },
            "actuals_details": [
                {
                    "timedetailId": "6388a285dcbb99b8ed1a6d7d",
                    "start_time": "2022-12-12T12:30:00.000Z",
                    "end_time": "2022-12-12T13:30:00.000Z",
                    "subject": "63453c46e60c0d87f558ce2e",
                    "topics": [
                        "6351392e6cc3bf3155d2913a"
                    ],
                    "completed_topics": [
                        "6351392e6cc3bf3155d2913a"
                    ],
                    "partially_completed_topics": [],
                    "teacher": "632d9ee754fd162cb1cb7372",
                    "_id": "6388a351dcbb99b8ed1a6eb5"
                },
                {
                    "timedetailId": "6388a285dcbb99b8ed1a6d7e",
                    "start_time": "2022-12-12T13:30:00.000Z",
                    "end_time": "2022-12-12T14:30:00.000Z",
                    "subject": "634682ff9dfb0b8839e24229",
                    "topics": [
                        "63453bb5e60c0d87f558cdb0"
                    ],
                    "completed_topics": [],
                    "partially_completed_topics": [
                        "63453bb5e60c0d87f558cdb0"
                    ],
                    "teacher": "632da12154fd162cb1cb7381",
                    "_id": "6388a351dcbb99b8ed1a6eb6"
                }
            ],
            "createdAt": "2022-12-01T12:48:05.538Z",
            "updatedAt": "2022-12-01T12:51:29.575Z",
            "__v": 0
        },
        {
            "_id": "6388a285dcbb99b8ed1a6d7c",
            "timetable": {
                "_id": "6388a282dcbb99b8ed1a6d5e",
                "batch": {
                    "_id": "6388a1bfdcbb99b8ed1a6ce3",
                    "name": "black ops",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63ac7029279a26e4e47d2fd2",
                        "639064e0d82a752282108b39",
                        "639042b16b8a6847d89b6df8",
                        "63872a728297b7bbca2a240b",
                        "635931edd1dee7910c88280c"
                    ],
                    "description": "descripitoin",
                    "batch_id": "7860",
                    "batch_date": {
                        "start_date": "2022-12-14T18:30:00.000Z"
                    },
                    "createdAt": "2022-12-01T12:44:47.088Z",
                    "updatedAt": "2023-01-06T08:43:56.247Z",
                    "__v": 0
                },
                "start_date": "2022-12-09T18:30:00.000Z",
                "end_date": "2022-12-14T18:30:00.000Z",
                "createdAt": "2022-12-01T12:48:02.957Z",
                "updatedAt": "2022-12-01T12:48:02.957Z",
                "__v": 0
            },
            "date": "2022-12-11T18:30:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2022-12-12T13:30:00.000Z",
                "end_time": "2022-12-12T14:30:00.000Z",
                "subject": {
                    "_id": "634682ff9dfb0b8839e24229",
                    "name": "ENGLISH",
                    "courses": [
                        "634683009dfb0b8839e24236",
                        "63c06519edf5f283d1b60ebf"
                    ],
                    "topics": [
                        {
                            "name": "verb",
                            "status": "false",
                            "_id": "63453bb5e60c0d87f558cdae"
                        },
                        {
                            "name": "adjaective",
                            "status": "false",
                            "_id": "63453bb5e60c0d87f558cdaf"
                        },
                        {
                            "name": "punctutauin",
                            "status": "false",
                            "_id": "63453bb5e60c0d87f558cdb0"
                        },
                        {
                            "name": "grammer",
                            "status": "false",
                            "_id": "63453bb5e60c0d87f558cdb1"
                        }
                    ],
                    "description": "asjhndfjkan fkmsdnfks",
                    "subject_id": "ENG",
                    "master_id": "63453bb5e60c0d87f558cdad",
                    "academic_year": "2022",
                    "createdAt": "2022-10-12T09:03:59.667Z",
                    "updatedAt": "2023-01-13T22:47:35.319Z",
                    "__v": 0,
                    "year_version": [
                        "master"
                    ]
                },
                "topics": [
                    "63453bb5e60c0d87f558cdb0"
                ],
                "teacher": "632da12154fd162cb1cb7381",
                "zoom_link": "https://us04web.zoom.us/s/75770253018?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc1NzcwMjUzMDE4IiwiZXhwIjoxNjY5OTA2MDgzLCJpYXQiOjE2Njk4OTg4ODMsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.MqyorbTuHA2i8MOUtS5_kruphhKkzpkNAnykMmGlmtE",
                "_id": "6388a285dcbb99b8ed1a6d7e"
            },
            "actuals_details": [
                {
                    "timedetailId": "6388a285dcbb99b8ed1a6d7d",
                    "start_time": "2022-12-12T12:30:00.000Z",
                    "end_time": "2022-12-12T13:30:00.000Z",
                    "subject": "63453c46e60c0d87f558ce2e",
                    "topics": [
                        "6351392e6cc3bf3155d2913a"
                    ],
                    "completed_topics": [
                        "6351392e6cc3bf3155d2913a"
                    ],
                    "partially_completed_topics": [],
                    "teacher": "632d9ee754fd162cb1cb7372",
                    "_id": "6388a351dcbb99b8ed1a6eb5"
                },
                {
                    "timedetailId": "6388a285dcbb99b8ed1a6d7e",
                    "start_time": "2022-12-12T13:30:00.000Z",
                    "end_time": "2022-12-12T14:30:00.000Z",
                    "subject": "634682ff9dfb0b8839e24229",
                    "topics": [
                        "63453bb5e60c0d87f558cdb0"
                    ],
                    "completed_topics": [],
                    "partially_completed_topics": [
                        "63453bb5e60c0d87f558cdb0"
                    ],
                    "teacher": "632da12154fd162cb1cb7381",
                    "_id": "6388a351dcbb99b8ed1a6eb6"
                }
            ],
            "createdAt": "2022-12-01T12:48:05.538Z",
            "updatedAt": "2022-12-01T12:51:29.575Z",
            "__v": 0
        },
        {
            "_id": "6388a285dcbb99b8ed1a6d81",
            "timetable": {
                "_id": "6388a282dcbb99b8ed1a6d5e",
                "batch": {
                    "_id": "6388a1bfdcbb99b8ed1a6ce3",
                    "name": "black ops",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63ac7029279a26e4e47d2fd2",
                        "639064e0d82a752282108b39",
                        "639042b16b8a6847d89b6df8",
                        "63872a728297b7bbca2a240b",
                        "635931edd1dee7910c88280c"
                    ],
                    "description": "descripitoin",
                    "batch_id": "7860",
                    "batch_date": {
                        "start_date": "2022-12-14T18:30:00.000Z"
                    },
                    "createdAt": "2022-12-01T12:44:47.088Z",
                    "updatedAt": "2023-01-06T08:43:56.247Z",
                    "__v": 0
                },
                "start_date": "2022-12-09T18:30:00.000Z",
                "end_date": "2022-12-14T18:30:00.000Z",
                "createdAt": "2022-12-01T12:48:02.957Z",
                "updatedAt": "2022-12-01T12:48:02.957Z",
                "__v": 0
            },
            "date": "2022-12-13T18:30:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2022-12-14T12:30:00.000Z",
                "end_time": "2022-12-14T13:30:00.000Z",
                "subject": {
                    "_id": "6388a190dcbb99b8ed1a6ca4",
                    "name": "hard subject",
                    "courses": [
                        "6388a191dcbb99b8ed1a6cb7"
                    ],
                    "topics": [
                        {
                            "name": "easy hard",
                            "status": "false",
                            "_id": "6388a143dcbb99b8ed1a6c41"
                        },
                        {
                            "name": "simple",
                            "status": "false",
                            "_id": "6388a143dcbb99b8ed1a6c42"
                        },
                        {
                            "name": "black hole",
                            "status": "false",
                            "_id": "6388a143dcbb99b8ed1a6c43"
                        }
                    ],
                    "description": "this is description of hard subject",
                    "subject_id": "1729",
                    "master_id": "6388a143dcbb99b8ed1a6c40",
                    "academic_year": "2022",
                    "createdAt": "2022-12-01T12:44:00.933Z",
                    "updatedAt": "2023-01-13T22:47:35.319Z",
                    "__v": 0,
                    "year_version": [
                        "master"
                    ]
                },
                "topics": [
                    "6388a143dcbb99b8ed1a6c41",
                    "6388a143dcbb99b8ed1a6c42",
                    "6388a143dcbb99b8ed1a6c43"
                ],
                "teacher": "632da12154fd162cb1cb7381",
                "zoom_link": "https://us04web.zoom.us/s/76976826438?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc2OTc2ODI2NDM4IiwiZXhwIjoxNjY5OTA2MDg0LCJpYXQiOjE2Njk4OTg4ODQsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.rGqaw7L8_o4ksuPj65OmK7x9VqcODeIgcVYQb6W7QuA",
                "_id": "6388a285dcbb99b8ed1a6d82"
            },
            "actuals_details": [],
            "createdAt": "2022-12-01T12:48:05.539Z",
            "updatedAt": "2022-12-01T12:48:05.539Z",
            "__v": 0
        },
        {
            "_id": "6388a285dcbb99b8ed1a6d81",
            "timetable": {
                "_id": "6388a282dcbb99b8ed1a6d5e",
                "batch": {
                    "_id": "6388a1bfdcbb99b8ed1a6ce3",
                    "name": "black ops",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63ac7029279a26e4e47d2fd2",
                        "639064e0d82a752282108b39",
                        "639042b16b8a6847d89b6df8",
                        "63872a728297b7bbca2a240b",
                        "635931edd1dee7910c88280c"
                    ],
                    "description": "descripitoin",
                    "batch_id": "7860",
                    "batch_date": {
                        "start_date": "2022-12-14T18:30:00.000Z"
                    },
                    "createdAt": "2022-12-01T12:44:47.088Z",
                    "updatedAt": "2023-01-06T08:43:56.247Z",
                    "__v": 0
                },
                "start_date": "2022-12-09T18:30:00.000Z",
                "end_date": "2022-12-14T18:30:00.000Z",
                "createdAt": "2022-12-01T12:48:02.957Z",
                "updatedAt": "2022-12-01T12:48:02.957Z",
                "__v": 0
            },
            "date": "2022-12-13T18:30:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2022-12-14T13:30:00.000Z",
                "end_time": "2022-12-14T14:30:00.000Z",
                "subject": {
                    "_id": "6388a190dcbb99b8ed1a6ca4",
                    "name": "hard subject",
                    "courses": [
                        "6388a191dcbb99b8ed1a6cb7"
                    ],
                    "topics": [
                        {
                            "name": "easy hard",
                            "status": "false",
                            "_id": "6388a143dcbb99b8ed1a6c41"
                        },
                        {
                            "name": "simple",
                            "status": "false",
                            "_id": "6388a143dcbb99b8ed1a6c42"
                        },
                        {
                            "name": "black hole",
                            "status": "false",
                            "_id": "6388a143dcbb99b8ed1a6c43"
                        }
                    ],
                    "description": "this is description of hard subject",
                    "subject_id": "1729",
                    "master_id": "6388a143dcbb99b8ed1a6c40",
                    "academic_year": "2022",
                    "createdAt": "2022-12-01T12:44:00.933Z",
                    "updatedAt": "2023-01-13T22:47:35.319Z",
                    "__v": 0,
                    "year_version": [
                        "master"
                    ]
                },
                "topics": [
                    "6388a143dcbb99b8ed1a6c42",
                    "6388a143dcbb99b8ed1a6c43"
                ],
                "teacher": "632da12154fd162cb1cb7381",
                "zoom_link": "https://us04web.zoom.us/s/77297178410?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc3Mjk3MTc4NDEwIiwiZXhwIjoxNjY5OTA2MDg1LCJpYXQiOjE2Njk4OTg4ODUsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.uxxHrosuNH_5Xc4g0jrlhMH7s72laY83LAQLlIL4a5Q",
                "_id": "6388a285dcbb99b8ed1a6d83"
            },
            "actuals_details": [],
            "createdAt": "2022-12-01T12:48:05.539Z",
            "updatedAt": "2022-12-01T12:48:05.539Z",
            "__v": 0
        },
        {
            "_id": "63c4ba378ad8a6917f1b5054",
            "timetable": {
                "_id": "63c4ba318ad8a6917f1b5037",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c591ab8ad8a6917f1b4d16",
                    "name": "DSA batch",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c591048ad8a6917f1b4b39",
                        "63c591038ad8a6917f1b4b1f"
                    ],
                    "description": "thinking",
                    "batch_id": "001",
                    "batch_date": {
                        "start_date": "2023-01-11T18:30:00.000Z",
                        "end_date": "2023-08-17T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-16T18:04:27.420Z",
                    "updatedAt": "2023-01-16T18:04:27.420Z",
                    "__v": 0
                },
                "start_date": "2023-01-15T18:30:00.000Z",
                "end_date": "2023-01-18T18:30:00.000Z",
                "createdAt": "2023-01-16T02:45:05.906Z",
                "updatedAt": "2023-01-16T02:45:05.906Z",
                "__v": 0
            },
            "date": "2023-01-16T18:30:00.000Z",
            "date_type": "holiday",
            "lecture_type": "online",
            "time_details": {},
            "actuals_details": [],
            "createdAt": "2023-01-16T02:45:11.805Z",
            "updatedAt": "2023-01-16T02:45:11.805Z",
            "__v": 0
        },
        {
            "_id": "63c4ba378ad8a6917f1b5051",
            "timetable": {
                "_id": "63c4ba318ad8a6917f1b5037",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c591ab8ad8a6917f1b4d16",
                    "name": "DSA batch",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c591048ad8a6917f1b4b39",
                        "63c591038ad8a6917f1b4b1f"
                    ],
                    "description": "thinking",
                    "batch_id": "001",
                    "batch_date": {
                        "start_date": "2023-01-11T18:30:00.000Z",
                        "end_date": "2023-08-17T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-16T18:04:27.420Z",
                    "updatedAt": "2023-01-16T18:04:27.420Z",
                    "__v": 0
                },
                "start_date": "2023-01-15T18:30:00.000Z",
                "end_date": "2023-01-18T18:30:00.000Z",
                "createdAt": "2023-01-16T02:45:05.906Z",
                "updatedAt": "2023-01-16T02:45:05.906Z",
                "__v": 0
            },
            "date": "2023-01-15T18:30:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-16T02:30:00.000Z",
                "end_time": "2023-01-16T03:30:00.000Z",
                "subject": {
                    "_id": "63c591048ad8a6917f1b4b3f",
                    "name": "v1 subject",
                    "courses": [
                        "63c591048ad8a6917f1b4b39",
                        "63c7ad86580ff496c4ab2c05",
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "t1",
                            "status": "false",
                            "_id": "63c58f3d8ad8a6917f1b4974"
                        },
                        {
                            "name": "t2",
                            "status": "false",
                            "_id": "63c58f3d8ad8a6917f1b4975"
                        },
                        {
                            "name": "t3",
                            "status": "false",
                            "_id": "63c58f3d8ad8a6917f1b4976"
                        }
                    ],
                    "description": "v1 subject Description",
                    "subject_id": "001",
                    "master_id": "63c58f3d8ad8a6917f1b4973",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master",
                        "AY23-24",
                        "AY24-25"
                    ],
                    "createdAt": "2023-01-16T18:01:40.359Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c58f3d8ad8a6917f1b4974"
                ],
                "teacher": "6392d78ad41fd249b71e8429",
                "zoom_link": "https://us04web.zoom.us/s/71831667038?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6IjcxODMxNjY3MDM4IiwiZXhwIjoxNjczOTAwOTAxLCJpYXQiOjE2NzM4OTM3MDEsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ._KKyP1mU26IhAX6uc3gj5asvBfbAEaejdC5K9-pIkOk",
                "_id": "63c4ba378ad8a6917f1b5052"
            },
            "actuals_details": [
                {
                    "timedetailId": "63c4ba378ad8a6917f1b5053",
                    "start_time": "2023-01-16T03:30:00.000Z",
                    "end_time": "2023-01-16T04:30:00.000Z",
                    "subject": "63c591048ad8a6917f1b4b3f",
                    "topics": [
                        "63c58f3d8ad8a6917f1b4975",
                        "63c58f3d8ad8a6917f1b4976"
                    ],
                    "completed_topics": [
                        "63c58f3d8ad8a6917f1b4976",
                        "63c58f3d8ad8a6917f1b4975"
                    ],
                    "partially_completed_topics": [],
                    "teacher": "634d51d34c9af80830386e25",
                    "_id": "63c4d0772e51061da90d80a8"
                },
                {
                    "timedetailId": "63c4ba378ad8a6917f1b5052",
                    "start_time": "2023-01-16T02:30:00.000Z",
                    "end_time": "2023-01-16T03:30:00.000Z",
                    "subject": "63c591048ad8a6917f1b4b3f",
                    "topics": [
                        "63c58f3d8ad8a6917f1b4974"
                    ],
                    "completed_topics": [
                        "63c58f3d8ad8a6917f1b4974"
                    ],
                    "partially_completed_topics": [],
                    "teacher": "6392d78ad41fd249b71e8429",
                    "_id": "63c4d0772e51061da90d80a9"
                }
            ],
            "createdAt": "2023-01-16T02:45:11.807Z",
            "updatedAt": "2023-01-16T17:08:00.364Z",
            "__v": 0
        },
        {
            "_id": "63c4ba378ad8a6917f1b5051",
            "timetable": {
                "_id": "63c4ba318ad8a6917f1b5037",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c591ab8ad8a6917f1b4d16",
                    "name": "DSA batch",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c591048ad8a6917f1b4b39",
                        "63c591038ad8a6917f1b4b1f"
                    ],
                    "description": "thinking",
                    "batch_id": "001",
                    "batch_date": {
                        "start_date": "2023-01-11T18:30:00.000Z",
                        "end_date": "2023-08-17T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-16T18:04:27.420Z",
                    "updatedAt": "2023-01-16T18:04:27.420Z",
                    "__v": 0
                },
                "start_date": "2023-01-15T18:30:00.000Z",
                "end_date": "2023-01-18T18:30:00.000Z",
                "createdAt": "2023-01-16T02:45:05.906Z",
                "updatedAt": "2023-01-16T02:45:05.906Z",
                "__v": 0
            },
            "date": "2023-01-15T18:30:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-16T03:30:00.000Z",
                "end_time": "2023-01-16T04:30:00.000Z",
                "subject": {
                    "_id": "63c591048ad8a6917f1b4b3f",
                    "name": "v1 subject",
                    "courses": [
                        "63c591048ad8a6917f1b4b39",
                        "63c7ad86580ff496c4ab2c05",
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "t1",
                            "status": "false",
                            "_id": "63c58f3d8ad8a6917f1b4974"
                        },
                        {
                            "name": "t2",
                            "status": "false",
                            "_id": "63c58f3d8ad8a6917f1b4975"
                        },
                        {
                            "name": "t3",
                            "status": "false",
                            "_id": "63c58f3d8ad8a6917f1b4976"
                        }
                    ],
                    "description": "v1 subject Description",
                    "subject_id": "001",
                    "master_id": "63c58f3d8ad8a6917f1b4973",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master",
                        "AY23-24",
                        "AY24-25"
                    ],
                    "createdAt": "2023-01-16T18:01:40.359Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c58f3d8ad8a6917f1b4975",
                    "63c58f3d8ad8a6917f1b4976"
                ],
                "teacher": "634d51d34c9af80830386e25",
                "zoom_link": "https://us04web.zoom.us/s/76658256683?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc2NjU4MjU2NjgzIiwiZXhwIjoxNjczOTAwOTAxLCJpYXQiOjE2NzM4OTM3MDEsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.QI0dZQ32wZfgtaMwnfc5mrBiVnWri97Q_7YWMMQF9q4",
                "_id": "63c4ba378ad8a6917f1b5053"
            },
            "actuals_details": [
                {
                    "timedetailId": "63c4ba378ad8a6917f1b5053",
                    "start_time": "2023-01-16T03:30:00.000Z",
                    "end_time": "2023-01-16T04:30:00.000Z",
                    "subject": "63c591048ad8a6917f1b4b3f",
                    "topics": [
                        "63c58f3d8ad8a6917f1b4975",
                        "63c58f3d8ad8a6917f1b4976"
                    ],
                    "completed_topics": [
                        "63c58f3d8ad8a6917f1b4976",
                        "63c58f3d8ad8a6917f1b4975"
                    ],
                    "partially_completed_topics": [],
                    "teacher": "634d51d34c9af80830386e25",
                    "_id": "63c4d0772e51061da90d80a8"
                },
                {
                    "timedetailId": "63c4ba378ad8a6917f1b5052",
                    "start_time": "2023-01-16T02:30:00.000Z",
                    "end_time": "2023-01-16T03:30:00.000Z",
                    "subject": "63c591048ad8a6917f1b4b3f",
                    "topics": [
                        "63c58f3d8ad8a6917f1b4974"
                    ],
                    "completed_topics": [
                        "63c58f3d8ad8a6917f1b4974"
                    ],
                    "partially_completed_topics": [],
                    "teacher": "6392d78ad41fd249b71e8429",
                    "_id": "63c4d0772e51061da90d80a9"
                }
            ],
            "createdAt": "2023-01-16T02:45:11.807Z",
            "updatedAt": "2023-01-16T17:08:00.364Z",
            "__v": 0
        },
        {
            "_id": "63c4ba378ad8a6917f1b5055",
            "timetable": {
                "_id": "63c4ba318ad8a6917f1b5037",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c591ab8ad8a6917f1b4d16",
                    "name": "DSA batch",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c591048ad8a6917f1b4b39",
                        "63c591038ad8a6917f1b4b1f"
                    ],
                    "description": "thinking",
                    "batch_id": "001",
                    "batch_date": {
                        "start_date": "2023-01-11T18:30:00.000Z",
                        "end_date": "2023-08-17T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-16T18:04:27.420Z",
                    "updatedAt": "2023-01-16T18:04:27.420Z",
                    "__v": 0
                },
                "start_date": "2023-01-15T18:30:00.000Z",
                "end_date": "2023-01-18T18:30:00.000Z",
                "createdAt": "2023-01-16T02:45:05.906Z",
                "updatedAt": "2023-01-16T02:45:05.906Z",
                "__v": 0
            },
            "date": "2023-01-17T18:30:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-18T02:30:00.000Z",
                "end_time": "2023-01-18T03:30:00.000Z",
                "subject": {
                    "_id": "63c591038ad8a6917f1b4b30",
                    "name": "v3 subject",
                    "courses": [
                        "63c591038ad8a6917f1b4b1f",
                        "63c7ad86580ff496c4ab2c05",
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "t7",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c7"
                        },
                        {
                            "name": "t8",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c8"
                        },
                        {
                            "name": "t9",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c9"
                        }
                    ],
                    "description": "v3 subject Description",
                    "subject_id": "003",
                    "master_id": "63c58f788ad8a6917f1b49c6",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master",
                        "AY23-24",
                        "AY24-25"
                    ],
                    "createdAt": "2023-01-16T18:01:39.812Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c58f788ad8a6917f1b49c7",
                    "63c58f788ad8a6917f1b49c8"
                ],
                "teacher": "634d51d34c9af80830386e25",
                "zoom_link": "https://us04web.zoom.us/s/78229003934?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc4MjI5MDAzOTM0IiwiZXhwIjoxNjczOTAwOTAzLCJpYXQiOjE2NzM4OTM3MDMsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.kd4s6sV1-oO93n-V9BZeKraKVr9m5Rv2bxtqvd9zAms",
                "_id": "63c4ba378ad8a6917f1b5056"
            },
            "actuals_details": [
                {
                    "timedetailId": "63c4ba378ad8a6917f1b5056",
                    "start_time": "2023-01-18T02:30:00.000Z",
                    "end_time": "2023-01-18T03:30:00.000Z",
                    "subject": "63c591038ad8a6917f1b4b30",
                    "topics": [
                        "63c58f788ad8a6917f1b49c7",
                        "63c58f788ad8a6917f1b49c8"
                    ],
                    "completed_topics": [
                        "63c58f788ad8a6917f1b49c7",
                        "63c58f788ad8a6917f1b49c8"
                    ],
                    "partially_completed_topics": [],
                    "teacher": "634d51d34c9af80830386e25",
                    "_id": "63c586d57b9b5e452a4824d6"
                },
                {
                    "timedetailId": "63c4ba378ad8a6917f1b5057",
                    "start_time": "2023-01-18T03:30:00.000Z",
                    "end_time": "2023-01-18T04:30:00.000Z",
                    "subject": "63c591038ad8a6917f1b4b30",
                    "topics": [
                        "63c58f788ad8a6917f1b49c9"
                    ],
                    "completed_topics": [],
                    "partially_completed_topics": [
                        "63c58f788ad8a6917f1b49c9"
                    ],
                    "teacher": "6392d78ad41fd249b71e8429",
                    "_id": "63c586d57b9b5e452a4824d7"
                }
            ],
            "createdAt": "2023-01-16T02:45:11.808Z",
            "updatedAt": "2023-01-17T10:47:18.306Z",
            "__v": 0,
            "status": "Cancelled"
        },
        {
            "_id": "63c4ba378ad8a6917f1b5055",
            "timetable": {
                "_id": "63c4ba318ad8a6917f1b5037",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c591ab8ad8a6917f1b4d16",
                    "name": "DSA batch",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c591048ad8a6917f1b4b39",
                        "63c591038ad8a6917f1b4b1f"
                    ],
                    "description": "thinking",
                    "batch_id": "001",
                    "batch_date": {
                        "start_date": "2023-01-11T18:30:00.000Z",
                        "end_date": "2023-08-17T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-16T18:04:27.420Z",
                    "updatedAt": "2023-01-16T18:04:27.420Z",
                    "__v": 0
                },
                "start_date": "2023-01-15T18:30:00.000Z",
                "end_date": "2023-01-18T18:30:00.000Z",
                "createdAt": "2023-01-16T02:45:05.906Z",
                "updatedAt": "2023-01-16T02:45:05.906Z",
                "__v": 0
            },
            "date": "2023-01-17T18:30:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-18T03:30:00.000Z",
                "end_time": "2023-01-18T04:30:00.000Z",
                "subject": {
                    "_id": "63c591038ad8a6917f1b4b30",
                    "name": "v3 subject",
                    "courses": [
                        "63c591038ad8a6917f1b4b1f",
                        "63c7ad86580ff496c4ab2c05",
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "t7",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c7"
                        },
                        {
                            "name": "t8",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c8"
                        },
                        {
                            "name": "t9",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c9"
                        }
                    ],
                    "description": "v3 subject Description",
                    "subject_id": "003",
                    "master_id": "63c58f788ad8a6917f1b49c6",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master",
                        "AY23-24",
                        "AY24-25"
                    ],
                    "createdAt": "2023-01-16T18:01:39.812Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c58f788ad8a6917f1b49c9"
                ],
                "teacher": "6392d78ad41fd249b71e8429",
                "zoom_link": "https://us04web.zoom.us/s/77026927196?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc3MDI2OTI3MTk2IiwiZXhwIjoxNjczOTAwOTA0LCJpYXQiOjE2NzM4OTM3MDQsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.mh_xNNR1-j-vQFwwQRrNBcEHyPD7DA5xci5Imh9uFlY",
                "_id": "63c4ba378ad8a6917f1b5057"
            },
            "actuals_details": [
                {
                    "timedetailId": "63c4ba378ad8a6917f1b5056",
                    "start_time": "2023-01-18T02:30:00.000Z",
                    "end_time": "2023-01-18T03:30:00.000Z",
                    "subject": "63c591038ad8a6917f1b4b30",
                    "topics": [
                        "63c58f788ad8a6917f1b49c7",
                        "63c58f788ad8a6917f1b49c8"
                    ],
                    "completed_topics": [
                        "63c58f788ad8a6917f1b49c7",
                        "63c58f788ad8a6917f1b49c8"
                    ],
                    "partially_completed_topics": [],
                    "teacher": "634d51d34c9af80830386e25",
                    "_id": "63c586d57b9b5e452a4824d6"
                },
                {
                    "timedetailId": "63c4ba378ad8a6917f1b5057",
                    "start_time": "2023-01-18T03:30:00.000Z",
                    "end_time": "2023-01-18T04:30:00.000Z",
                    "subject": "63c591038ad8a6917f1b4b30",
                    "topics": [
                        "63c58f788ad8a6917f1b49c9"
                    ],
                    "completed_topics": [],
                    "partially_completed_topics": [
                        "63c58f788ad8a6917f1b49c9"
                    ],
                    "teacher": "6392d78ad41fd249b71e8429",
                    "_id": "63c586d57b9b5e452a4824d7"
                }
            ],
            "createdAt": "2023-01-16T02:45:11.808Z",
            "updatedAt": "2023-01-17T10:47:18.306Z",
            "__v": 0,
            "status": "Cancelled"
        },
        {
            "_id": "63c4ba378ad8a6917f1b5058",
            "timetable": {
                "_id": "63c4ba318ad8a6917f1b5037",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c591ab8ad8a6917f1b4d16",
                    "name": "DSA batch",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c591048ad8a6917f1b4b39",
                        "63c591038ad8a6917f1b4b1f"
                    ],
                    "description": "thinking",
                    "batch_id": "001",
                    "batch_date": {
                        "start_date": "2023-01-11T18:30:00.000Z",
                        "end_date": "2023-08-17T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-16T18:04:27.420Z",
                    "updatedAt": "2023-01-16T18:04:27.420Z",
                    "__v": 0
                },
                "start_date": "2023-01-15T18:30:00.000Z",
                "end_date": "2023-01-18T18:30:00.000Z",
                "createdAt": "2023-01-16T02:45:05.906Z",
                "updatedAt": "2023-01-16T02:45:05.906Z",
                "__v": 0
            },
            "date": "2023-01-18T18:30:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-19T02:30:00.000Z",
                "end_time": "2023-01-19T03:30:00.000Z",
                "subject": {
                    "_id": "63c591038ad8a6917f1b4b25",
                    "name": "v2 subject",
                    "courses": [
                        "63c591038ad8a6917f1b4b1f",
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "topics": [
                        {
                            "name": "t4",
                            "status": "false",
                            "_id": "63c58f5b8ad8a6917f1b499e"
                        },
                        {
                            "name": "t5",
                            "status": "false",
                            "_id": "63c58f5b8ad8a6917f1b499f"
                        },
                        {
                            "name": "t6",
                            "status": "false",
                            "_id": "63c58f5b8ad8a6917f1b49a0"
                        }
                    ],
                    "description": "v2 subject Description",
                    "subject_id": "002",
                    "master_id": "63c58f5b8ad8a6917f1b499d",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master",
                        "AY23-24",
                        "AY24-25"
                    ],
                    "createdAt": "2023-01-16T18:01:39.525Z",
                    "updatedAt": "2023-01-18T08:27:51.767Z",
                    "__v": 0
                },
                "topics": [
                    "63c58f5b8ad8a6917f1b499e"
                ],
                "teacher": "6392d78ad41fd249b71e8429",
                "zoom_link": "https://us04web.zoom.us/s/78103929223?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc4MTAzOTI5MjIzIiwiZXhwIjoxNjczOTAwOTA1LCJpYXQiOjE2NzM4OTM3MDUsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.Y5zcQi4EzQcHkC2QVCQxjrP8n__2V9ujYyR-d-XdJX8",
                "_id": "63c4ba378ad8a6917f1b5059"
            },
            "actuals_details": [],
            "createdAt": "2023-01-16T02:45:11.808Z",
            "updatedAt": "2023-01-16T02:45:11.808Z",
            "__v": 0
        },
        {
            "_id": "63c4ba378ad8a6917f1b5058",
            "timetable": {
                "_id": "63c4ba318ad8a6917f1b5037",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c591ab8ad8a6917f1b4d16",
                    "name": "DSA batch",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c591048ad8a6917f1b4b39",
                        "63c591038ad8a6917f1b4b1f"
                    ],
                    "description": "thinking",
                    "batch_id": "001",
                    "batch_date": {
                        "start_date": "2023-01-11T18:30:00.000Z",
                        "end_date": "2023-08-17T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-16T18:04:27.420Z",
                    "updatedAt": "2023-01-16T18:04:27.420Z",
                    "__v": 0
                },
                "start_date": "2023-01-15T18:30:00.000Z",
                "end_date": "2023-01-18T18:30:00.000Z",
                "createdAt": "2023-01-16T02:45:05.906Z",
                "updatedAt": "2023-01-16T02:45:05.906Z",
                "__v": 0
            },
            "date": "2023-01-18T18:30:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-19T03:30:00.000Z",
                "end_time": "2023-01-19T04:30:00.000Z",
                "subject": {
                    "_id": "63c591038ad8a6917f1b4b25",
                    "name": "v2 subject",
                    "courses": [
                        "63c591038ad8a6917f1b4b1f",
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "topics": [
                        {
                            "name": "t4",
                            "status": "false",
                            "_id": "63c58f5b8ad8a6917f1b499e"
                        },
                        {
                            "name": "t5",
                            "status": "false",
                            "_id": "63c58f5b8ad8a6917f1b499f"
                        },
                        {
                            "name": "t6",
                            "status": "false",
                            "_id": "63c58f5b8ad8a6917f1b49a0"
                        }
                    ],
                    "description": "v2 subject Description",
                    "subject_id": "002",
                    "master_id": "63c58f5b8ad8a6917f1b499d",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master",
                        "AY23-24",
                        "AY24-25"
                    ],
                    "createdAt": "2023-01-16T18:01:39.525Z",
                    "updatedAt": "2023-01-18T08:27:51.767Z",
                    "__v": 0
                },
                "topics": [
                    "63c58f5b8ad8a6917f1b499f",
                    "63c58f5b8ad8a6917f1b49a0"
                ],
                "teacher": "634d51d34c9af80830386e25",
                "zoom_link": "https://us04web.zoom.us/s/78961786610?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc4OTYxNzg2NjEwIiwiZXhwIjoxNjczOTAwOTA2LCJpYXQiOjE2NzM4OTM3MDYsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.s_Uk_x8yI9KgK8Xd_N2oUAeJLIf1AOYdCZt-cCAEe1Q",
                "_id": "63c4ba378ad8a6917f1b505a"
            },
            "actuals_details": [],
            "createdAt": "2023-01-16T02:45:11.808Z",
            "updatedAt": "2023-01-16T02:45:11.808Z",
            "__v": 0
        },
        {
            "_id": "63c7a828580ff496c4ab2606",
            "timetable": {
                "_id": "63c4ba318ad8a6917f1b5037",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c591ab8ad8a6917f1b4d16",
                    "name": "DSA batch",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c591048ad8a6917f1b4b39",
                        "63c591038ad8a6917f1b4b1f"
                    ],
                    "description": "thinking",
                    "batch_id": "001",
                    "batch_date": {
                        "start_date": "2023-01-11T18:30:00.000Z",
                        "end_date": "2023-08-17T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-16T18:04:27.420Z",
                    "updatedAt": "2023-01-16T18:04:27.420Z",
                    "__v": 0
                },
                "start_date": "2023-01-15T18:30:00.000Z",
                "end_date": "2023-01-18T18:30:00.000Z",
                "createdAt": "2023-01-16T02:45:05.906Z",
                "updatedAt": "2023-01-16T02:45:05.906Z",
                "__v": 0
            },
            "date": "2023-01-21T00:00:00.000Z",
            "date_type": "holiday",
            "lecture_type": "online",
            "time_details": {},
            "actuals_details": [],
            "createdAt": "2023-01-18T08:04:56.169Z",
            "updatedAt": "2023-01-18T08:04:56.169Z",
            "__v": 0
        },
        {
            "_id": "63c7a828580ff496c4ab2605",
            "timetable": {
                "_id": "63c4ba318ad8a6917f1b5037",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c591ab8ad8a6917f1b4d16",
                    "name": "DSA batch",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c591048ad8a6917f1b4b39",
                        "63c591038ad8a6917f1b4b1f"
                    ],
                    "description": "thinking",
                    "batch_id": "001",
                    "batch_date": {
                        "start_date": "2023-01-11T18:30:00.000Z",
                        "end_date": "2023-08-17T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-16T18:04:27.420Z",
                    "updatedAt": "2023-01-16T18:04:27.420Z",
                    "__v": 0
                },
                "start_date": "2023-01-15T18:30:00.000Z",
                "end_date": "2023-01-18T18:30:00.000Z",
                "createdAt": "2023-01-16T02:45:05.906Z",
                "updatedAt": "2023-01-16T02:45:05.906Z",
                "__v": 0
            },
            "date": "2023-01-20T00:00:00.000Z",
            "date_type": "holiday",
            "lecture_type": "online",
            "time_details": {},
            "actuals_details": [],
            "createdAt": "2023-01-18T08:04:56.169Z",
            "updatedAt": "2023-01-18T08:04:56.169Z",
            "__v": 0
        },
        {
            "_id": "63c7a828580ff496c4ab2607",
            "timetable": {
                "_id": "63c4ba318ad8a6917f1b5037",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c591ab8ad8a6917f1b4d16",
                    "name": "DSA batch",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c591048ad8a6917f1b4b39",
                        "63c591038ad8a6917f1b4b1f"
                    ],
                    "description": "thinking",
                    "batch_id": "001",
                    "batch_date": {
                        "start_date": "2023-01-11T18:30:00.000Z",
                        "end_date": "2023-08-17T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-16T18:04:27.420Z",
                    "updatedAt": "2023-01-16T18:04:27.420Z",
                    "__v": 0
                },
                "start_date": "2023-01-15T18:30:00.000Z",
                "end_date": "2023-01-18T18:30:00.000Z",
                "createdAt": "2023-01-16T02:45:05.906Z",
                "updatedAt": "2023-01-16T02:45:05.906Z",
                "__v": 0
            },
            "date": "2023-01-22T00:00:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-22T07:30:00.000Z",
                "end_time": "2023-01-22T08:30:00.000Z",
                "subject": {
                    "_id": "63c591038ad8a6917f1b4b30",
                    "name": "v3 subject",
                    "courses": [
                        "63c591038ad8a6917f1b4b1f",
                        "63c7ad86580ff496c4ab2c05",
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "t7",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c7"
                        },
                        {
                            "name": "t8",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c8"
                        },
                        {
                            "name": "t9",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c9"
                        }
                    ],
                    "description": "v3 subject Description",
                    "subject_id": "003",
                    "master_id": "63c58f788ad8a6917f1b49c6",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master",
                        "AY23-24",
                        "AY24-25"
                    ],
                    "createdAt": "2023-01-16T18:01:39.812Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c58f788ad8a6917f1b49c7",
                    "63c58f788ad8a6917f1b49c8",
                    "63c58f788ad8a6917f1b49c9"
                ],
                "teacher": "6392d78ad41fd249b71e8429",
                "zoom_link": "https://us04web.zoom.us/s/78849229507?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc4ODQ5MjI5NTA3IiwiZXhwIjoxNjc0MDM2Mjk2LCJpYXQiOjE2NzQwMjkwOTYsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.KUPrJR5OXPzBXoa6nSVeEwMxhacga8ao65RGbbuRAFM",
                "_id": "63c7a828580ff496c4ab2608"
            },
            "actuals_details": [],
            "createdAt": "2023-01-18T08:04:56.253Z",
            "updatedAt": "2023-01-18T08:04:56.253Z",
            "__v": 0
        },
        {
            "_id": "63c7b50e580ff496c4ab39ac",
            "timetable": {
                "_id": "63c7b50c580ff496c4ab3997",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7b39a580ff496c4ab365b",
                    "name": "Batch-New",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7b365580ff496c4ab35d9",
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asjdh ajh d",
                    "batch_id": "asa65446",
                    "batch_date": {
                        "start_date": "2023-01-18T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:53:46.301Z",
                    "updatedAt": "2023-01-18T08:53:46.301Z",
                    "__v": 0
                },
                "start_date": "2023-01-17T18:30:00.000Z",
                "end_date": "2023-01-19T18:30:00.000Z",
                "createdAt": "2023-01-18T08:59:56.235Z",
                "updatedAt": "2023-01-18T08:59:56.235Z",
                "__v": 0
            },
            "date": "2023-01-18T00:00:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-18T08:30:00.000Z",
                "end_time": "2023-01-18T09:30:00.000Z",
                "subject": {
                    "_id": "63c7b365580ff496c4ab35e0",
                    "name": "NEw Subject",
                    "courses": [
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "s1",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353a"
                        },
                        {
                            "name": "s2",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353b"
                        },
                        {
                            "name": "s3",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353c"
                        },
                        {
                            "name": "s4",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353d"
                        }
                    ],
                    "description": "Description",
                    "subject_id": "As6d54",
                    "master_id": "63c7b33a580ff496c4ab3539",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master"
                    ],
                    "createdAt": "2023-01-18T08:52:53.401Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c7b33a580ff496c4ab353a",
                    "63c7b33a580ff496c4ab353b"
                ],
                "teacher": "63c4d2fc2e51061da90d83a5",
                "zoom_link": "https://us04web.zoom.us/s/72216402256?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6IjcyMjE2NDAyMjU2IiwiZXhwIjoxNjc0MDM5NTk2LCJpYXQiOjE2NzQwMzIzOTYsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.jbBFTqLjKA_Zls-JWSbxADjel6iOAxLIu_cDDLf91bI",
                "_id": "63c7b50e580ff496c4ab39ad"
            },
            "actuals_details": [],
            "createdAt": "2023-01-18T08:59:58.740Z",
            "updatedAt": "2023-01-18T08:59:58.740Z",
            "__v": 0
        },
        {
            "_id": "63c7b50e580ff496c4ab39ac",
            "timetable": {
                "_id": "63c7b50c580ff496c4ab3997",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7b39a580ff496c4ab365b",
                    "name": "Batch-New",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7b365580ff496c4ab35d9",
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asjdh ajh d",
                    "batch_id": "asa65446",
                    "batch_date": {
                        "start_date": "2023-01-18T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:53:46.301Z",
                    "updatedAt": "2023-01-18T08:53:46.301Z",
                    "__v": 0
                },
                "start_date": "2023-01-17T18:30:00.000Z",
                "end_date": "2023-01-19T18:30:00.000Z",
                "createdAt": "2023-01-18T08:59:56.235Z",
                "updatedAt": "2023-01-18T08:59:56.235Z",
                "__v": 0
            },
            "date": "2023-01-18T00:00:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-18T09:30:00.000Z",
                "end_time": "2023-01-18T10:30:00.000Z",
                "subject": {
                    "_id": "63c7b365580ff496c4ab35e0",
                    "name": "NEw Subject",
                    "courses": [
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "s1",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353a"
                        },
                        {
                            "name": "s2",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353b"
                        },
                        {
                            "name": "s3",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353c"
                        },
                        {
                            "name": "s4",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353d"
                        }
                    ],
                    "description": "Description",
                    "subject_id": "As6d54",
                    "master_id": "63c7b33a580ff496c4ab3539",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master"
                    ],
                    "createdAt": "2023-01-18T08:52:53.401Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c7b33a580ff496c4ab353c",
                    "63c7b33a580ff496c4ab353d"
                ],
                "teacher": "63c4d2fc2e51061da90d83a5",
                "zoom_link": "https://us04web.zoom.us/s/75381792722?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc1MzgxNzkyNzIyIiwiZXhwIjoxNjc0MDM5NTk3LCJpYXQiOjE2NzQwMzIzOTcsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.iSD7cXeRgeNkFQZlF6Lp7nJdCovxxrTVNJGw1zhXPjI",
                "_id": "63c7b50e580ff496c4ab39ae"
            },
            "actuals_details": [],
            "createdAt": "2023-01-18T08:59:58.740Z",
            "updatedAt": "2023-01-18T08:59:58.740Z",
            "__v": 0
        },
        {
            "_id": "63c7b50e580ff496c4ab39af",
            "timetable": {
                "_id": "63c7b50c580ff496c4ab3997",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7b39a580ff496c4ab365b",
                    "name": "Batch-New",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7b365580ff496c4ab35d9",
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asjdh ajh d",
                    "batch_id": "asa65446",
                    "batch_date": {
                        "start_date": "2023-01-18T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:53:46.301Z",
                    "updatedAt": "2023-01-18T08:53:46.301Z",
                    "__v": 0
                },
                "start_date": "2023-01-17T18:30:00.000Z",
                "end_date": "2023-01-19T18:30:00.000Z",
                "createdAt": "2023-01-18T08:59:56.235Z",
                "updatedAt": "2023-01-18T08:59:56.235Z",
                "__v": 0
            },
            "date": "2023-01-19T00:00:00.000Z",
            "date_type": "holiday",
            "lecture_type": "online",
            "time_details": {},
            "actuals_details": [],
            "createdAt": "2023-01-18T08:59:58.740Z",
            "updatedAt": "2023-01-18T08:59:58.740Z",
            "__v": 0
        },
        {
            "_id": "63c7b50e580ff496c4ab39b0",
            "timetable": {
                "_id": "63c7b50c580ff496c4ab3997",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7b39a580ff496c4ab365b",
                    "name": "Batch-New",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7b365580ff496c4ab35d9",
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asjdh ajh d",
                    "batch_id": "asa65446",
                    "batch_date": {
                        "start_date": "2023-01-18T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:53:46.301Z",
                    "updatedAt": "2023-01-18T08:53:46.301Z",
                    "__v": 0
                },
                "start_date": "2023-01-17T18:30:00.000Z",
                "end_date": "2023-01-19T18:30:00.000Z",
                "createdAt": "2023-01-18T08:59:56.235Z",
                "updatedAt": "2023-01-18T08:59:56.235Z",
                "__v": 0
            },
            "date": "2023-01-20T00:00:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-20T08:30:00.000Z",
                "end_time": "2023-01-20T09:30:00.000Z",
                "subject": {
                    "_id": "63c7b365580ff496c4ab35e0",
                    "name": "NEw Subject",
                    "courses": [
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "s1",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353a"
                        },
                        {
                            "name": "s2",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353b"
                        },
                        {
                            "name": "s3",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353c"
                        },
                        {
                            "name": "s4",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353d"
                        }
                    ],
                    "description": "Description",
                    "subject_id": "As6d54",
                    "master_id": "63c7b33a580ff496c4ab3539",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master"
                    ],
                    "createdAt": "2023-01-18T08:52:53.401Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c7b33a580ff496c4ab353c",
                    "63c7b33a580ff496c4ab353d"
                ],
                "teacher": "634d51d34c9af80830386e25",
                "zoom_link": "https://us04web.zoom.us/s/71397066209?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6IjcxMzk3MDY2MjA5IiwiZXhwIjoxNjc0MDM5NTk3LCJpYXQiOjE2NzQwMzIzOTcsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.54hjd_jhF7oMwqgccoJzAtMggbHnIdTKjAUiXWUJOt8",
                "_id": "63c7b50e580ff496c4ab39b1"
            },
            "actuals_details": [],
            "createdAt": "2023-01-18T08:59:58.741Z",
            "updatedAt": "2023-01-18T09:05:07.649Z",
            "__v": 0
        },
        {
            "_id": "63c7b50e580ff496c4ab39b0",
            "timetable": {
                "_id": "63c7b50c580ff496c4ab3997",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7b39a580ff496c4ab365b",
                    "name": "Batch-New",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7b365580ff496c4ab35d9",
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asjdh ajh d",
                    "batch_id": "asa65446",
                    "batch_date": {
                        "start_date": "2023-01-18T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:53:46.301Z",
                    "updatedAt": "2023-01-18T08:53:46.301Z",
                    "__v": 0
                },
                "start_date": "2023-01-17T18:30:00.000Z",
                "end_date": "2023-01-19T18:30:00.000Z",
                "createdAt": "2023-01-18T08:59:56.235Z",
                "updatedAt": "2023-01-18T08:59:56.235Z",
                "__v": 0
            },
            "date": "2023-01-20T00:00:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-20T09:30:00.000Z",
                "end_time": "2023-01-20T10:30:00.000Z",
                "subject": {
                    "_id": "63c591038ad8a6917f1b4b30",
                    "name": "v3 subject",
                    "courses": [
                        "63c591038ad8a6917f1b4b1f",
                        "63c7ad86580ff496c4ab2c05",
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "t7",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c7"
                        },
                        {
                            "name": "t8",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c8"
                        },
                        {
                            "name": "t9",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c9"
                        }
                    ],
                    "description": "v3 subject Description",
                    "subject_id": "003",
                    "master_id": "63c58f788ad8a6917f1b49c6",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master",
                        "AY23-24",
                        "AY24-25"
                    ],
                    "createdAt": "2023-01-16T18:01:39.812Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c58f788ad8a6917f1b49c7",
                    "63c58f788ad8a6917f1b49c8",
                    "63c58f788ad8a6917f1b49c9"
                ],
                "teacher": "63c4d2fc2e51061da90d83a5",
                "zoom_link": "https://us04web.zoom.us/s/78040508137?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc4MDQwNTA4MTM3IiwiZXhwIjoxNjc0MDM5NTk4LCJpYXQiOjE2NzQwMzIzOTgsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.5sfPiXzblCsprmVQh474lc_mFNUVu7k8uSgbKm5xI9Q",
                "_id": "63c7b50e580ff496c4ab39b2",
                "status": "Cancelled"
            },
            "actuals_details": [],
            "createdAt": "2023-01-18T08:59:58.741Z",
            "updatedAt": "2023-01-18T09:05:07.649Z",
            "__v": 0
        },
        {
            "_id": "63c7b7d7580ff496c4ab4185",
            "timetable": {
                "_id": "63c7b50c580ff496c4ab3997",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7b39a580ff496c4ab365b",
                    "name": "Batch-New",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7b365580ff496c4ab35d9",
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asjdh ajh d",
                    "batch_id": "asa65446",
                    "batch_date": {
                        "start_date": "2023-01-18T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:53:46.301Z",
                    "updatedAt": "2023-01-18T08:53:46.301Z",
                    "__v": 0
                },
                "start_date": "2023-01-17T18:30:00.000Z",
                "end_date": "2023-01-19T18:30:00.000Z",
                "createdAt": "2023-01-18T08:59:56.235Z",
                "updatedAt": "2023-01-18T08:59:56.235Z",
                "__v": 0
            },
            "date": "2023-02-01T00:00:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-02-01T08:30:00.000Z",
                "end_time": "2023-02-01T09:30:00.000Z",
                "subject": {
                    "_id": "63c7ad87580ff496c4ab2c32",
                    "name": "Quantitative Aptitude",
                    "courses": [
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "topics": [
                        {
                            "name": "T1",
                            "status": "false",
                            "_id": "639dc040574eecf04bde1fd2"
                        },
                        {
                            "name": "T2",
                            "status": "false",
                            "_id": "639dc040574eecf04bde1fd3"
                        },
                        {
                            "name": "T3",
                            "status": "false",
                            "_id": "639dc040574eecf04bde1fd4"
                        }
                    ],
                    "description": "Quant BSR",
                    "subject_id": "Quant_BSR",
                    "master_id": "639dc040574eecf04bde1fd1",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master"
                    ],
                    "createdAt": "2023-01-18T08:27:51.111Z",
                    "updatedAt": "2023-01-18T08:27:51.767Z",
                    "__v": 0
                },
                "topics": [
                    "639dc040574eecf04bde1fd2"
                ],
                "teacher": "63c4d2fc2e51061da90d83a5",
                "zoom_link": "https://us04web.zoom.us/s/72312985153?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6IjcyMzEyOTg1MTUzIiwiZXhwIjoxNjc0MDQwMzExLCJpYXQiOjE2NzQwMzMxMTEsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.swVTLHQtJuROliYgLLc5Rp3JAh0ROARl5uRSspzkKnQ",
                "_id": "63c7b7d7580ff496c4ab4186"
            },
            "actuals_details": [],
            "createdAt": "2023-01-18T09:11:51.599Z",
            "updatedAt": "2023-01-18T09:11:51.599Z",
            "__v": 0
        },
        {
            "_id": "63c7b7d7580ff496c4ab4180",
            "timetable": {
                "_id": "63c7b50c580ff496c4ab3997",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7b39a580ff496c4ab365b",
                    "name": "Batch-New",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7b365580ff496c4ab35d9",
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asjdh ajh d",
                    "batch_id": "asa65446",
                    "batch_date": {
                        "start_date": "2023-01-18T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:53:46.301Z",
                    "updatedAt": "2023-01-18T08:53:46.301Z",
                    "__v": 0
                },
                "start_date": "2023-01-17T18:30:00.000Z",
                "end_date": "2023-01-19T18:30:00.000Z",
                "createdAt": "2023-01-18T08:59:56.235Z",
                "updatedAt": "2023-01-18T08:59:56.235Z",
                "__v": 0
            },
            "date": "2023-01-29T00:00:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-29T08:30:00.000Z",
                "end_time": "2023-01-29T09:30:00.000Z",
                "subject": {
                    "_id": "63c7b365580ff496c4ab35e0",
                    "name": "NEw Subject",
                    "courses": [
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "s1",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353a"
                        },
                        {
                            "name": "s2",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353b"
                        },
                        {
                            "name": "s3",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353c"
                        },
                        {
                            "name": "s4",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353d"
                        }
                    ],
                    "description": "Description",
                    "subject_id": "As6d54",
                    "master_id": "63c7b33a580ff496c4ab3539",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master"
                    ],
                    "createdAt": "2023-01-18T08:52:53.401Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c7b33a580ff496c4ab353a"
                ],
                "teacher": "63c4d2fc2e51061da90d83a5",
                "zoom_link": "https://us04web.zoom.us/s/74985126883?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc0OTg1MTI2ODgzIiwiZXhwIjoxNjc0MDQwMzEwLCJpYXQiOjE2NzQwMzMxMTAsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.LvxumPEaaZRNUf2tmkxcP_lgLgDj8C4xzeBb0WSe9_Q",
                "_id": "63c7b7d7580ff496c4ab4181"
            },
            "actuals_details": [],
            "createdAt": "2023-01-18T09:11:51.599Z",
            "updatedAt": "2023-01-18T09:11:51.599Z",
            "__v": 0
        },
        {
            "_id": "63c7b7d7580ff496c4ab417a",
            "timetable": {
                "_id": "63c7b50c580ff496c4ab3997",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7b39a580ff496c4ab365b",
                    "name": "Batch-New",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7b365580ff496c4ab35d9",
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asjdh ajh d",
                    "batch_id": "asa65446",
                    "batch_date": {
                        "start_date": "2023-01-18T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:53:46.301Z",
                    "updatedAt": "2023-01-18T08:53:46.301Z",
                    "__v": 0
                },
                "start_date": "2023-01-17T18:30:00.000Z",
                "end_date": "2023-01-19T18:30:00.000Z",
                "createdAt": "2023-01-18T08:59:56.235Z",
                "updatedAt": "2023-01-18T08:59:56.235Z",
                "__v": 0
            },
            "date": "2023-01-28T00:00:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-28T08:30:00.000Z",
                "end_time": "2023-01-28T09:30:00.000Z",
                "subject": {
                    "_id": "63c7b365580ff496c4ab35e0",
                    "name": "NEw Subject",
                    "courses": [
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "s1",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353a"
                        },
                        {
                            "name": "s2",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353b"
                        },
                        {
                            "name": "s3",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353c"
                        },
                        {
                            "name": "s4",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353d"
                        }
                    ],
                    "description": "Description",
                    "subject_id": "As6d54",
                    "master_id": "63c7b33a580ff496c4ab3539",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master"
                    ],
                    "createdAt": "2023-01-18T08:52:53.401Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c7b33a580ff496c4ab353a",
                    "63c7b33a580ff496c4ab353b",
                    "63c7b33a580ff496c4ab353c"
                ],
                "teacher": "63c4d2fc2e51061da90d83a5",
                "zoom_link": "https://us04web.zoom.us/s/75427346864?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc1NDI3MzQ2ODY0IiwiZXhwIjoxNjc0MDQwMzA2LCJpYXQiOjE2NzQwMzMxMDYsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.flFprdgNYCJIDxD0v5ezNJG7xeseXjt2Pc9IkU1tfXk",
                "_id": "63c7b7d7580ff496c4ab417b"
            },
            "actuals_details": [],
            "createdAt": "2023-01-18T09:11:51.599Z",
            "updatedAt": "2023-01-18T09:11:51.599Z",
            "__v": 0
        },
        {
            "_id": "63c7b7d7580ff496c4ab417a",
            "timetable": {
                "_id": "63c7b50c580ff496c4ab3997",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7b39a580ff496c4ab365b",
                    "name": "Batch-New",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7b365580ff496c4ab35d9",
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asjdh ajh d",
                    "batch_id": "asa65446",
                    "batch_date": {
                        "start_date": "2023-01-18T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:53:46.301Z",
                    "updatedAt": "2023-01-18T08:53:46.301Z",
                    "__v": 0
                },
                "start_date": "2023-01-17T18:30:00.000Z",
                "end_date": "2023-01-19T18:30:00.000Z",
                "createdAt": "2023-01-18T08:59:56.235Z",
                "updatedAt": "2023-01-18T08:59:56.235Z",
                "__v": 0
            },
            "date": "2023-01-28T00:00:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-28T09:30:00.000Z",
                "end_time": "2023-01-28T10:30:00.000Z",
                "subject": {
                    "_id": "63c7ad86580ff496c4ab2c0c",
                    "name": "Aabid Subject",
                    "courses": [
                        "63c7ad86580ff496c4ab2c05",
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "t1",
                            "status": "false",
                            "_id": "63c7ad60580ff496c4ab2b60"
                        },
                        {
                            "name": "te",
                            "status": "false",
                            "_id": "63c7ad60580ff496c4ab2b61"
                        },
                        {
                            "name": "t3",
                            "status": "false",
                            "_id": "63c7ad60580ff496c4ab2b62"
                        },
                        {
                            "name": "t4",
                            "status": "false",
                            "_id": "63c7ad60580ff496c4ab2b63"
                        }
                    ],
                    "description": "NEw subjct",
                    "subject_id": "65asd",
                    "master_id": "63c7ad60580ff496c4ab2b5f",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master",
                        "AY23-24"
                    ],
                    "createdAt": "2023-01-18T08:27:50.280Z",
                    "updatedAt": "2023-01-18T21:17:13.706Z",
                    "__v": 0
                },
                "topics": [
                    "63c7ad60580ff496c4ab2b60",
                    "63c7ad60580ff496c4ab2b61",
                    "63c7ad60580ff496c4ab2b62"
                ],
                "teacher": "63c4d2fc2e51061da90d83a5",
                "zoom_link": "https://us04web.zoom.us/s/73642127734?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6IjczNjQyMTI3NzM0IiwiZXhwIjoxNjc0MDQwMzA2LCJpYXQiOjE2NzQwMzMxMDYsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.qYCKnIW_TsS3j8KyeuAvygvfO1VDLpL64-_acth5qyg",
                "_id": "63c7b7d7580ff496c4ab417c"
            },
            "actuals_details": [],
            "createdAt": "2023-01-18T09:11:51.599Z",
            "updatedAt": "2023-01-18T09:11:51.599Z",
            "__v": 0
        },
        {
            "_id": "63c7b7d7580ff496c4ab417a",
            "timetable": {
                "_id": "63c7b50c580ff496c4ab3997",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7b39a580ff496c4ab365b",
                    "name": "Batch-New",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7b365580ff496c4ab35d9",
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asjdh ajh d",
                    "batch_id": "asa65446",
                    "batch_date": {
                        "start_date": "2023-01-18T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:53:46.301Z",
                    "updatedAt": "2023-01-18T08:53:46.301Z",
                    "__v": 0
                },
                "start_date": "2023-01-17T18:30:00.000Z",
                "end_date": "2023-01-19T18:30:00.000Z",
                "createdAt": "2023-01-18T08:59:56.235Z",
                "updatedAt": "2023-01-18T08:59:56.235Z",
                "__v": 0
            },
            "date": "2023-01-28T00:00:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-28T10:30:00.000Z",
                "end_time": "2023-01-28T11:30:00.000Z",
                "subject": {
                    "_id": "63c7b365580ff496c4ab35e0",
                    "name": "NEw Subject",
                    "courses": [
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "s1",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353a"
                        },
                        {
                            "name": "s2",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353b"
                        },
                        {
                            "name": "s3",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353c"
                        },
                        {
                            "name": "s4",
                            "status": "false",
                            "_id": "63c7b33a580ff496c4ab353d"
                        }
                    ],
                    "description": "Description",
                    "subject_id": "As6d54",
                    "master_id": "63c7b33a580ff496c4ab3539",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master"
                    ],
                    "createdAt": "2023-01-18T08:52:53.401Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c7b33a580ff496c4ab353a",
                    "63c7b33a580ff496c4ab353c",
                    "63c7b33a580ff496c4ab353d"
                ],
                "teacher": "63c4d2fc2e51061da90d83a5",
                "zoom_link": "https://us04web.zoom.us/s/71391180694?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6IjcxMzkxMTgwNjk0IiwiZXhwIjoxNjc0MDQwMzA3LCJpYXQiOjE2NzQwMzMxMDcsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.5lcnWG4uMPDLt9wtH6TGpcYlQzSGADCQHWymFMXfs5s",
                "_id": "63c7b7d7580ff496c4ab417d"
            },
            "actuals_details": [],
            "createdAt": "2023-01-18T09:11:51.599Z",
            "updatedAt": "2023-01-18T09:11:51.599Z",
            "__v": 0
        },
        {
            "_id": "63c7b7d7580ff496c4ab417a",
            "timetable": {
                "_id": "63c7b50c580ff496c4ab3997",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7b39a580ff496c4ab365b",
                    "name": "Batch-New",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7b365580ff496c4ab35d9",
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asjdh ajh d",
                    "batch_id": "asa65446",
                    "batch_date": {
                        "start_date": "2023-01-18T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:53:46.301Z",
                    "updatedAt": "2023-01-18T08:53:46.301Z",
                    "__v": 0
                },
                "start_date": "2023-01-17T18:30:00.000Z",
                "end_date": "2023-01-19T18:30:00.000Z",
                "createdAt": "2023-01-18T08:59:56.235Z",
                "updatedAt": "2023-01-18T08:59:56.235Z",
                "__v": 0
            },
            "date": "2023-01-28T00:00:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-28T11:30:00.000Z",
                "end_time": "2023-01-28T12:30:00.000Z",
                "subject": {
                    "_id": "63c591048ad8a6917f1b4b3f",
                    "name": "v1 subject",
                    "courses": [
                        "63c591048ad8a6917f1b4b39",
                        "63c7ad86580ff496c4ab2c05",
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "t1",
                            "status": "false",
                            "_id": "63c58f3d8ad8a6917f1b4974"
                        },
                        {
                            "name": "t2",
                            "status": "false",
                            "_id": "63c58f3d8ad8a6917f1b4975"
                        },
                        {
                            "name": "t3",
                            "status": "false",
                            "_id": "63c58f3d8ad8a6917f1b4976"
                        }
                    ],
                    "description": "v1 subject Description",
                    "subject_id": "001",
                    "master_id": "63c58f3d8ad8a6917f1b4973",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master",
                        "AY23-24",
                        "AY24-25"
                    ],
                    "createdAt": "2023-01-16T18:01:40.359Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c58f3d8ad8a6917f1b4974",
                    "63c58f3d8ad8a6917f1b4976"
                ],
                "teacher": "63c4d2fc2e51061da90d83a5",
                "zoom_link": "https://us04web.zoom.us/s/77553666546?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc3NTUzNjY2NTQ2IiwiZXhwIjoxNjc0MDQwMzA3LCJpYXQiOjE2NzQwMzMxMDcsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.8PADtesXdtqlcv05eKmmI_qd9RDiQMpwWvGpxfvhVSk",
                "_id": "63c7b7d7580ff496c4ab417e"
            },
            "actuals_details": [],
            "createdAt": "2023-01-18T09:11:51.599Z",
            "updatedAt": "2023-01-18T09:11:51.599Z",
            "__v": 0
        },
        {
            "_id": "63c7b7d7580ff496c4ab417a",
            "timetable": {
                "_id": "63c7b50c580ff496c4ab3997",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7b39a580ff496c4ab365b",
                    "name": "Batch-New",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7b365580ff496c4ab35d9",
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asjdh ajh d",
                    "batch_id": "asa65446",
                    "batch_date": {
                        "start_date": "2023-01-18T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:53:46.301Z",
                    "updatedAt": "2023-01-18T08:53:46.301Z",
                    "__v": 0
                },
                "start_date": "2023-01-17T18:30:00.000Z",
                "end_date": "2023-01-19T18:30:00.000Z",
                "createdAt": "2023-01-18T08:59:56.235Z",
                "updatedAt": "2023-01-18T08:59:56.235Z",
                "__v": 0
            },
            "date": "2023-01-28T00:00:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-28T12:30:00.000Z",
                "end_time": "2023-01-28T13:30:00.000Z",
                "subject": {
                    "_id": "63c591048ad8a6917f1b4b3f",
                    "name": "v1 subject",
                    "courses": [
                        "63c591048ad8a6917f1b4b39",
                        "63c7ad86580ff496c4ab2c05",
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "t1",
                            "status": "false",
                            "_id": "63c58f3d8ad8a6917f1b4974"
                        },
                        {
                            "name": "t2",
                            "status": "false",
                            "_id": "63c58f3d8ad8a6917f1b4975"
                        },
                        {
                            "name": "t3",
                            "status": "false",
                            "_id": "63c58f3d8ad8a6917f1b4976"
                        }
                    ],
                    "description": "v1 subject Description",
                    "subject_id": "001",
                    "master_id": "63c58f3d8ad8a6917f1b4973",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master",
                        "AY23-24",
                        "AY24-25"
                    ],
                    "createdAt": "2023-01-16T18:01:40.359Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c58f3d8ad8a6917f1b4976"
                ],
                "teacher": "634d51d34c9af80830386e25",
                "zoom_link": "https://us04web.zoom.us/s/73945924326?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6IjczOTQ1OTI0MzI2IiwiZXhwIjoxNjc0MDQwMzA5LCJpYXQiOjE2NzQwMzMxMDksImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.Lue5x2gYjF3tD0ydMA8zZQSOo9Mm__2LTDXrRZ1W3GE",
                "_id": "63c7b7d7580ff496c4ab417f"
            },
            "actuals_details": [],
            "createdAt": "2023-01-18T09:11:51.599Z",
            "updatedAt": "2023-01-18T09:11:51.599Z",
            "__v": 0
        },
        {
            "_id": "63c7b7d7580ff496c4ab4183",
            "timetable": {
                "_id": "63c7b50c580ff496c4ab3997",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7b39a580ff496c4ab365b",
                    "name": "Batch-New",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7b365580ff496c4ab35d9",
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asjdh ajh d",
                    "batch_id": "asa65446",
                    "batch_date": {
                        "start_date": "2023-01-18T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:53:46.301Z",
                    "updatedAt": "2023-01-18T08:53:46.301Z",
                    "__v": 0
                },
                "start_date": "2023-01-17T18:30:00.000Z",
                "end_date": "2023-01-19T18:30:00.000Z",
                "createdAt": "2023-01-18T08:59:56.235Z",
                "updatedAt": "2023-01-18T08:59:56.235Z",
                "__v": 0
            },
            "date": "2023-01-31T00:00:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-31T08:30:00.000Z",
                "end_time": "2023-01-31T09:30:00.000Z",
                "subject": {
                    "_id": "63c591048ad8a6917f1b4b3f",
                    "name": "v1 subject",
                    "courses": [
                        "63c591048ad8a6917f1b4b39",
                        "63c7ad86580ff496c4ab2c05",
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "t1",
                            "status": "false",
                            "_id": "63c58f3d8ad8a6917f1b4974"
                        },
                        {
                            "name": "t2",
                            "status": "false",
                            "_id": "63c58f3d8ad8a6917f1b4975"
                        },
                        {
                            "name": "t3",
                            "status": "false",
                            "_id": "63c58f3d8ad8a6917f1b4976"
                        }
                    ],
                    "description": "v1 subject Description",
                    "subject_id": "001",
                    "master_id": "63c58f3d8ad8a6917f1b4973",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master",
                        "AY23-24",
                        "AY24-25"
                    ],
                    "createdAt": "2023-01-16T18:01:40.359Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c58f3d8ad8a6917f1b4976"
                ],
                "teacher": "63c4d2fc2e51061da90d83a5",
                "zoom_link": "https://us04web.zoom.us/s/78334292352?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc4MzM0MjkyMzUyIiwiZXhwIjoxNjc0MDQwMzEwLCJpYXQiOjE2NzQwMzMxMTAsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.XFNe-WHivXvfBV-VBcmQsjXvcNf4ZfgDf7ful-JD7h4",
                "_id": "63c7b7d7580ff496c4ab4184"
            },
            "actuals_details": [],
            "createdAt": "2023-01-18T09:11:51.599Z",
            "updatedAt": "2023-01-18T09:11:51.599Z",
            "__v": 0
        },
        {
            "_id": "63c7b7d7580ff496c4ab4182",
            "timetable": {
                "_id": "63c7b50c580ff496c4ab3997",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7b39a580ff496c4ab365b",
                    "name": "Batch-New",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7b365580ff496c4ab35d9",
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asjdh ajh d",
                    "batch_id": "asa65446",
                    "batch_date": {
                        "start_date": "2023-01-18T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:53:46.301Z",
                    "updatedAt": "2023-01-18T08:53:46.301Z",
                    "__v": 0
                },
                "start_date": "2023-01-17T18:30:00.000Z",
                "end_date": "2023-01-19T18:30:00.000Z",
                "createdAt": "2023-01-18T08:59:56.235Z",
                "updatedAt": "2023-01-18T08:59:56.235Z",
                "__v": 0
            },
            "date": "2023-01-30T00:00:00.000Z",
            "date_type": "holiday",
            "lecture_type": "online",
            "time_details": {},
            "actuals_details": [],
            "createdAt": "2023-01-18T09:11:51.597Z",
            "updatedAt": "2023-01-18T09:11:51.597Z",
            "__v": 0
        },
        {
            "_id": "63c7ba05580ff496c4ab44e9",
            "timetable": {
                "_id": "63c7ba03580ff496c4ab44da",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7ada5580ff496c4ab2c96",
                    "name": "Aabid Batch",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asdas 6a5d aa d",
                    "batch_id": "a5d4a",
                    "batch_date": {
                        "start_date": "2023-01-24T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:28:21.389Z",
                    "updatedAt": "2023-01-18T08:28:21.389Z",
                    "__v": 0
                },
                "start_date": "2023-01-27T18:30:00.000Z",
                "end_date": "2023-01-27T18:30:00.000Z",
                "createdAt": "2023-01-18T09:21:07.150Z",
                "updatedAt": "2023-01-18T09:21:07.150Z",
                "__v": 0
            },
            "date": "2023-01-28T00:00:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-28T08:30:00.000Z",
                "end_time": "2023-01-28T09:30:00.000Z",
                "subject": {
                    "_id": "63c7ad86580ff496c4ab2c0c",
                    "name": "Aabid Subject",
                    "courses": [
                        "63c7ad86580ff496c4ab2c05",
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "t1",
                            "status": "false",
                            "_id": "63c7ad60580ff496c4ab2b60"
                        },
                        {
                            "name": "te",
                            "status": "false",
                            "_id": "63c7ad60580ff496c4ab2b61"
                        },
                        {
                            "name": "t3",
                            "status": "false",
                            "_id": "63c7ad60580ff496c4ab2b62"
                        },
                        {
                            "name": "t4",
                            "status": "false",
                            "_id": "63c7ad60580ff496c4ab2b63"
                        }
                    ],
                    "description": "NEw subjct",
                    "subject_id": "65asd",
                    "master_id": "63c7ad60580ff496c4ab2b5f",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master",
                        "AY23-24"
                    ],
                    "createdAt": "2023-01-18T08:27:50.280Z",
                    "updatedAt": "2023-01-18T21:17:13.706Z",
                    "__v": 0
                },
                "topics": [
                    "63c7ad60580ff496c4ab2b60"
                ],
                "teacher": "63c4d2fc2e51061da90d83a5",
                "zoom_link": "https://us04web.zoom.us/s/71787555094?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6IjcxNzg3NTU1MDk0IiwiZXhwIjoxNjc0MDQwODY3LCJpYXQiOjE2NzQwMzM2NjcsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.O6iI5q0Yno6Jmdo_3dDV7ArJKaN6Za8kIAQUwSAML8g",
                "_id": "63c7ba05580ff496c4ab44ea"
            },
            "actuals_details": [],
            "createdAt": "2023-01-18T09:21:09.060Z",
            "updatedAt": "2023-01-18T09:21:09.060Z",
            "__v": 0
        },
        {
            "_id": "63c7ba05580ff496c4ab44e9",
            "timetable": {
                "_id": "63c7ba03580ff496c4ab44da",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7ada5580ff496c4ab2c96",
                    "name": "Aabid Batch",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asdas 6a5d aa d",
                    "batch_id": "a5d4a",
                    "batch_date": {
                        "start_date": "2023-01-24T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:28:21.389Z",
                    "updatedAt": "2023-01-18T08:28:21.389Z",
                    "__v": 0
                },
                "start_date": "2023-01-27T18:30:00.000Z",
                "end_date": "2023-01-27T18:30:00.000Z",
                "createdAt": "2023-01-18T09:21:07.150Z",
                "updatedAt": "2023-01-18T09:21:07.150Z",
                "__v": 0
            },
            "date": "2023-01-28T00:00:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-28T09:30:00.000Z",
                "end_time": "2023-01-28T10:30:00.000Z",
                "subject": {
                    "_id": "63c591038ad8a6917f1b4b30",
                    "name": "v3 subject",
                    "courses": [
                        "63c591038ad8a6917f1b4b1f",
                        "63c7ad86580ff496c4ab2c05",
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "t7",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c7"
                        },
                        {
                            "name": "t8",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c8"
                        },
                        {
                            "name": "t9",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c9"
                        }
                    ],
                    "description": "v3 subject Description",
                    "subject_id": "003",
                    "master_id": "63c58f788ad8a6917f1b49c6",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master",
                        "AY23-24",
                        "AY24-25"
                    ],
                    "createdAt": "2023-01-16T18:01:39.812Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c58f788ad8a6917f1b49c7",
                    "63c58f788ad8a6917f1b49c8"
                ],
                "teacher": "6392d78ad41fd249b71e8429",
                "zoom_link": "https://us04web.zoom.us/s/76035470679?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc2MDM1NDcwNjc5IiwiZXhwIjoxNjc0MDQwODY4LCJpYXQiOjE2NzQwMzM2NjgsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.dRt1szE26u2Ttls0QT1pHMmjCZlhknZzwn80DlwOL-w",
                "_id": "63c7ba05580ff496c4ab44eb"
            },
            "actuals_details": [],
            "createdAt": "2023-01-18T09:21:09.060Z",
            "updatedAt": "2023-01-18T09:21:09.060Z",
            "__v": 0
        },
        {
            "_id": "63c7ba05580ff496c4ab44e9",
            "timetable": {
                "_id": "63c7ba03580ff496c4ab44da",
                "center": {
                    "_id": "63298dd027e32b6c45239f1d",
                    "name": "Bhandup - Mumbai",
                    "createdAt": "2022-09-20T09:54:24.554Z",
                    "updatedAt": "2022-09-20T09:54:24.554Z",
                    "__v": 0
                },
                "batch": {
                    "_id": "63c7ada5580ff496c4ab2c96",
                    "name": "Aabid Batch",
                    "center": "63298dd027e32b6c45239f1d",
                    "courses": [
                        "63c7ad86580ff496c4ab2c05"
                    ],
                    "description": "asdas 6a5d aa d",
                    "batch_id": "a5d4a",
                    "batch_date": {
                        "start_date": "2023-01-24T18:30:00.000Z"
                    },
                    "academic_year": "AY22-23",
                    "createdAt": "2023-01-18T08:28:21.389Z",
                    "updatedAt": "2023-01-18T08:28:21.389Z",
                    "__v": 0
                },
                "start_date": "2023-01-27T18:30:00.000Z",
                "end_date": "2023-01-27T18:30:00.000Z",
                "createdAt": "2023-01-18T09:21:07.150Z",
                "updatedAt": "2023-01-18T09:21:07.150Z",
                "__v": 0
            },
            "date": "2023-01-28T00:00:00.000Z",
            "date_type": "lecture",
            "lecture_type": "online",
            "time_details": {
                "start_time": "2023-01-28T10:30:00.000Z",
                "end_time": "2023-01-28T11:30:00.000Z",
                "subject": {
                    "_id": "63c591038ad8a6917f1b4b30",
                    "name": "v3 subject",
                    "courses": [
                        "63c591038ad8a6917f1b4b1f",
                        "63c7ad86580ff496c4ab2c05",
                        "63c7b365580ff496c4ab35d9"
                    ],
                    "topics": [
                        {
                            "name": "t7",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c7"
                        },
                        {
                            "name": "t8",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c8"
                        },
                        {
                            "name": "t9",
                            "status": "false",
                            "_id": "63c58f788ad8a6917f1b49c9"
                        }
                    ],
                    "description": "v3 subject Description",
                    "subject_id": "003",
                    "master_id": "63c58f788ad8a6917f1b49c6",
                    "academic_year": "AY22-23",
                    "year_version": [
                        "AY22-23",
                        "master",
                        "AY23-24",
                        "AY24-25"
                    ],
                    "createdAt": "2023-01-16T18:01:39.812Z",
                    "updatedAt": "2023-01-18T08:52:54.505Z",
                    "__v": 0
                },
                "topics": [
                    "63c58f788ad8a6917f1b49c8"
                ],
                "teacher": "634d51d34c9af80830386e25",
                "zoom_link": "https://us04web.zoom.us/s/76456891630?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlN5d0FIcjFHU1MtaXliSzVjekRDR1EiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoidXMwNCIsImNsdCI6MCwibW51bSI6Ijc2NDU2ODkxNjMwIiwiZXhwIjoxNjc0MDQwODY4LCJpYXQiOjE2NzQwMzM2NjgsImFpZCI6IkVGaThTdkZ6VF9hN0ZxX2dYOTY5T2ciLCJjaWQiOiIifQ.pe40JuTQlZJkgirAAEcL5dfeIuXpQY_zxqSe83XQfeY",
                "_id": "63c7ba05580ff496c4ab44ec"
            },
            "actuals_details": [],
            "createdAt": "2023-01-18T09:21:09.060Z",
            "updatedAt": "2023-01-18T09:21:09.060Z",
            "__v": 0
        }
    ]
}