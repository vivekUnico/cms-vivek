const mongoose = require("mongoose");


const studentScreening = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course'
        }
    ],
    rollNo: {
        type: String
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "completed"]
    },

    materials: {
        "physical_study_material": {
            type: Boolean,
            default: false
        },
        "bag": {
            type: Boolean,
            default: false
        },
        "id_card": {
            type: Boolean,
            default: false
        },
        "login_created": {
            type: Boolean,
            default: false
        },
        other: {
            other_text: String,
            other_value: Boolean
        }
    }
},
    { timestamps: true }
);
module.exports = mongoose.model("studentScreening", studentScreening);