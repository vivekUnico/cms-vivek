const mongoose = require("mongoose");

const attendanceScheme = new mongoose.Schema(
    {
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'created_by_type'
        },
        data: {
            type: Object,
        },
        attendance_type: {
            type: String,
            required: [true, "Please provide attendance_type"]
        },
        created_by_type: {
            type: String,
            enum: ["student", "staff"],
            required: [true, "Please provide created_by_type"]
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