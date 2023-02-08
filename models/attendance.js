const mongoose = require("mongoose");

// const attendanceScheme = new mongoose.Schema(
//     {
//         created_by: {
//             type: mongoose.Schema.Types.ObjectId,
//             refPath: 'created_by_type'
//         },
//         data: {
//             type: Object,
//         },
//         attendance_type: {
//             type: String,
//             required: [true, "Please provide attendance_type"]
//         },
//         created_by_type: {
//             type: String,
//             enum: ["student", "staff"],
//             required: [true, "Please provide created_by_type"]
//         },
//         submit_type: {
//             type: String,
//             enum: ["online", "offline"],
//             required: [true, "Please provide submit_type"]
//         }
//     },
//     { timestamps: true }
// );
// module.exports = mongoose.model("attendance", attendanceScheme);

const attendanceScheme = new mongoose.Schema(
    {
        created_staff: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "staff"
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "student"
        },
        subjectTimeDetails : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "subjectTimeDetail"
        },
        present : {
            type : String,
            enum : ["present", "absent"],
            default : "present"
        },
        attendance_type: {
            type: String,
            required: [true, "Please provide attendance_type"]
        },
        submit_type: {
            type: String,
            enum: ["online", "offline"],
            required: [true, "Please provide submit_type"]
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("attendance", attendanceScheme);