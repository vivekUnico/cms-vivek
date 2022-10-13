const mongoose = require("mongoose");

const assignmentScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please provide name"],
            trim: true,
        },
        timetable_datedetails: {
            type: mongoose.Schema.Types.ObjectId,
            require: [true, "Please provide timetable"],
            trim: true,
            ref: "datedetails"
        },
        lecture_subject: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "subject"
        }],
        center: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "center"
        }],

        course: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "course"
        }],
        topic: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "subject.topic"
        }],
        batch: {
            type: mongoose.Schema.Types.ObjectId,
            require: [true, "Please provide batch name"],
            trim: true,
            ref: "batch"
        },
        submissionDateTime: {
            type: Date,
            require: [true, "Please provide submissionDateTime"],
            trim: true,
        },
        description: {
            type: String,
            require: [true, "Please provide description"],
            trim: true,
        },


    },
    { timestamps: true }
);
module.exports = mongoose.model("assignment", assignmentScheme);
