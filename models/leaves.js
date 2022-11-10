const mongoose = require("mongoose");

const leavesScheme = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'type',
            required: [true, "Please provide name"],
        },
        type: {
            type: String,
            enum: ["staff", "student"],
            required: [true, "Please provide type"],
        },
        leave_date: {
            type: Date,
            require: [true, "Please provide leave_date"],
        },
        total_leave: {
            type: Number,
            default: 0
        },
        applied_on: {
            type: Date
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Not-Approved", "Cancelled"],
            default: "Pending"
        },
        reason: {
            type: String,
            require: [true, "Please provide reason"],
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("leave", leavesScheme);