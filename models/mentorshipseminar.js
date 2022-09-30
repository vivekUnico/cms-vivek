const mongoose = require("mongoose");

const mentorSeminarScheme = new mongoose.Schema(
    {
        teacher_name: {
            type: String,
            trim: true,
            required: [true, "Please provide Teacher's name"],
        },
        meet_date_time: {
            type: Date,
            trim: false,
            required: [true, "Please provide Date time of meeting"],
        },
        meet_type: {
            type: String,
            require: [true, "Please provide meet_type"],
            trim: true,
        },
        type: {
            type: String,
            enum: ["seminar", "mentorship",],
            require: [true, "Please provide type"],
            trim: true,
        },
        mode: {
            type: String,
            trim: true,
            required: [true, "Please provide Mode"],
        },
        description: {
            type: String,
            trim: true,
            required: [true, "Please provide description"],
        },

    },
    { timestamps: true }
);
module.exports = mongoose.model("mentorshipseminar", mentorSeminarScheme);