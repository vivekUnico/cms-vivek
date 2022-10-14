const mongoose = require("mongoose");

const feedbackScheme = new mongoose.Schema(
    {
        feedback: {
            type: String,
            trim: true,
            required: [true, "Please provide feedback"],
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'created_by_type'
        },
        data: {
            type: Object,
        },
        feedback_type: {
            type: String,
            enum: ["lecture", "gamification"],
            required: [true, "Please provide feedback_type"]
        },
        created_by_type: {
            type: String,
            enum: ["student", "staff"],
            required: [true, "Please provide created_by_type"]
        },
        submit_type: {
            type: String,
            enum: ["online", "offline"],
            required: [true, "Please provide submit_type"]
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("feedback", feedbackScheme);