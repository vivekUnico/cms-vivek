const mongoose = require("mongoose");

const followupScheme = new mongoose.Schema(
    {
        followup_type: {
            type: String,
            trim: true,
            enum: ["lead","enquiry"],
            required: [true, "Please provide followup_type"],
        },
        created_by:  {
            required: [true, "Please provide created_by"],
            type: mongoose.Schema.Types.ObjectId,
            ref: 'staff'
        },
        connection_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "lead-and-enquiry"
        },
        followup_list: [
            {
                date: {
                    type: Date,
                    required: [true,"Please provide followup date"]
                },
                followup_by:  {
                    required: [true, "Please provide followup_by"],
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'staff'
                },
                status: {
                    type: String,
                    trim: true,
                    enum: ["HOT TA", "Enquiry Done", "Warn", "Cold", "Rejected"],
                    required: [true,"Please provide followup status"]
                },
                comment: {
                    type: String
                },
                completed_comment: String, 
                completed: {
                    type: Boolean,
                    default: false
                },
                addedTime : {
                    type: Date,
                    default : new Date()
                }
            }
        ]
    },
    { timestamps: true }
);
module.exports = mongoose.model("followup", followupScheme);