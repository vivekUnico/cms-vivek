const mongoose = require("mongoose");

const subjectTimeDetailScheme = new mongoose.Schema({
    start_time: {
        type: Date,
        required: [true, "Please provide start time"],
    },
    end_time: {
        type: Date,
        required: [true, "Please provide end time"],
    },
    actual_start_time : Date,
    actual_end_time : Date,
    center : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "center"
    },
    batch : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "batch"
    },
    subject: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subject'
    },
    actual_subject: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subject'
    },
    topics: [],
    actual_topics: [],
    teacher: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'staff'
    },
    actual_teacher: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'staff'
    },
    zoom_link: String,
    zoom_password: String,
    lecture_type: {
        type: String,
        enum: ["online", "offline"],
        default: "online",
    },
    date_type: {
        type: String,
        enum: ["holiday", "lecture", "exam"],
        default : "lecture"
    },
    ActualStatus : {
        type : Boolean,
        default : false
    }
}, { timestamps: true });

module.exports = mongoose.model("subjectTimeDetail", subjectTimeDetailScheme);