const mongoose = require("mongoose");

const ticketScheme = new mongoose.Schema(
    {
        summary: {
            type: String,
            trim: true,
            required: [true, "Please provide summary"]

        },
        reason: {
            type: String,
            trim: true,
            required: [true, "Please provide reason"]

        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'staff',
            required: [true, "Please provide assignedTo"]
        },
        priority: {
            type: String,
            enum: ["high", "low", "medium"],
            required: [true, "Please provide priority"]
        },
        status: {
            type: String,
            enum: ["open", "on-hold", "closed", "resolved"],
            required: [true, "Please provide status"]
        },
        description: {
            type: String,
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("asTicket", ticketScheme);