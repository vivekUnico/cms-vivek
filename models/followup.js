const mongoose = require("mongoose");

const followupScheme = new mongoose.Schema(
    {
        followup_type: {
            type: String,
            trim: true,
            enum: ["lead","enquiry"],
            required: [true, "Please provide followup_type"],
        },
        connection_id: {
            type: String,
            trim: true,
            required: [true, "Please provide connection_id"],
        },
        followup_by:  {
            required: [true, "Please provide followup_by"],
            type: mongoose.Schema.Types.ObjectId,
            ref: 'staff'
        },
        completed: {
            type: Boolean,
            required: [true, "Please provide completed"],
        },
        followup_list: [
            {
                next_date: {
                    type: Date,
                    required: [true,"Please provide followup next_date"]
                },
                status: {
                    type: String,
                    trim: true,
                    enum: ["HOT TA", "Enquiry Done", "Warn", "Cold", "Rejected"],
                    required: [true,"Please provide followup status"]
                },
                conversation: {
                    type: String,
                    required: [true,"Please provide followup conversation"]
                }
            }
        ]
    },
    { timestamps: true }
);
module.exports = mongoose.model("followup", followupScheme);