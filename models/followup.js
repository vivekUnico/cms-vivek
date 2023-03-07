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
            type: mongoose.Schema.Types.ObjectId,
            ref: "lead-and-enquiry"
        },
        created_by:  {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'staff'
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
                created_by:  {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'staff'
                },
                status: {
                    type: String,
                    trim: true,
                    enum: ["HOT", "WARM", "COLD", "REJECTED"],
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