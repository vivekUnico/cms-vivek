const mongoose = require("mongoose");

const timetableScheme = new mongoose.Schema(
    {
        center: {
            required: [true, "Please provide center"],
            type: mongoose.Schema.Types.ObjectId,
            ref: 'center'
        },
        batch: {
            required: [true, "Please provide batch"],
            type: mongoose.Schema.Types.ObjectId,
            ref: 'batch'
        },
        start_date: {
            type: Date,
            required: [true, "Please provide start date"],
        },
        end_date: Date,

        // date_details: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'datedetails'
        //     }
        // ],
    },
    { timestamps: true }
);
module.exports = mongoose.model("timetable", timetableScheme);