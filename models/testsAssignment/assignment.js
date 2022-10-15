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
            require: [false, "Please provide submissionDateTime"],
            trim: true,
        },
        description: {
            type: String,
            require: [false, "Please provide description"],
            trim: true,
        },
        type: {
            type: String,
            enum: ["submission", "assignment"],
            require: [false, "Please provide type"],
            trim: true,
        },
        submitted_value: {
            type: String,
            require: [false, "Please provide submitted_value"],
        },
        submission_type: {
            type: String,
            enum: ["online", "offline"],
            require: [false, "Please provide submitted_value"],
        },
        submitted_by: {
            type: mongoose.Schema.Types.ObjectId,
            require: [true, "Please provide submitted_by"],
            trim: true,
            ref: "student"
        }

    },
    { timestamps: true }
);
module.exports = mongoose.model("assignment", assignmentScheme);
