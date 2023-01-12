const mongoose = require("mongoose");

const courseScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please provide course name"],
            trim: true,
        },
        price: {
            type: String,
            require: [true, "Please provide course price"],
            trim: true,
        },
        centers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'center'
            }
        ],
        subjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'subject'
            }
        ],
        description: {
            type: String,
            require: [true, "Please provide description name"],
            trim: true,
        },
        course_id: {
            type: String,
            required: [true, "Please provide a course id"],
        },
        master_id: {
            type: String,
            trim: true,
        },
        academic_year: {
            type: String,
            trim: true,
            default: "master"
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("course", courseScheme);