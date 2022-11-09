const mongoose = require("mongoose");

const mentorSeminarScheme = new mongoose.Schema(
    {
        teacher_name: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'staff',
        },
        meet_date_time: {
            type: Date,
            trim: false,
            required: [true, "Please provide Date time of meeting"],
        },
        meet_type: {
            type: String,
            // enum: ["1-1", "",],
            require: [true, "Please provide meet_type"],
            trim: true,
        },
        type: {
            type: String,
            enum: ["seminar", "mentorship",],
            require: [true, "Please provide type"],
            trim: true,
        },
        zoom_link: {
            type: String
        },
        mode: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            required: [true, "Please provide description"],
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student',
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("mentorshipseminar", mentorSeminarScheme);