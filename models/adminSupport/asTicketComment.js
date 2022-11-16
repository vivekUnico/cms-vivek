const mongoose = require("mongoose");

const commentScheme = new mongoose.Schema(
    {
        comment: {
            type: String,
            trim: true,
            required: [true, "Please provide resolution"]
        },
        commentBy: {
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
module.exports = mongoose.model("asTicketComment", commentScheme);