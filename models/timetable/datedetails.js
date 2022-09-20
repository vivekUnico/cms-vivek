const mongoose = require("mongoose");

const datedetailsScheme = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: [true, "Please provide Date"]
        },
        date_type: {
            type: String,
            enum: ["holiday", "lecture"],
            required: [true, "Please provide date_type"]
        },
        lecture_type: {
            type: String,
            enum: ["online", "offline"],
            required: [true, "Please provide lecture_type"]
        },

        time_details: [
            {
                start_time: Date,
                end_time: Date,
                subject: {
                    required: [true, "Please provide subject"],
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'subject'
                },
                topics: [
                ],
                teacher: {
                    required: [true, "Please provide teacher"],
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'staff'
                }
            }
        ]
    },
    { timestamps: true }
);
module.exports = mongoose.model("datedetails", datedetailsScheme);