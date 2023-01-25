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
    topics: [],
    teacher: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'staff'
    },
    zoom_link: String,
    zoom_password: String,
    ActualStatus : {
        type : Boolean,
        default : false
    }
}, { timestamps: true });

module.exports = mongoose.model("subjectTimeDetail", subjectTimeDetailScheme);