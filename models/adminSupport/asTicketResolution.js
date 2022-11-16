const mongoose = require("mongoose");

const resolutionScheme = new mongoose.Schema(
    {
        resolution: {
            type: String,
            trim: true,
            required: [true, "Please provide resolution"]
        },
        resolvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'staff',
            required: [true, "Please provide assignedTo"]
        },
        ticketId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'asTicket',
            required: [true, "Please provide ticketId"]
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("asTicketResolution", resolutionScheme);