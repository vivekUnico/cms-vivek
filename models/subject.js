const mongoose = require("mongoose");

const subjectScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please provide subject name"],
            trim: true,
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'course'
            }
        ],
        topics: [
            {
                name: {
                    type: String,
                    required: true,
                    trim: true,
                },
                status: {
                    type: String,
                    required: true,
                    trim: true,
                }
            }
        ],
        Teachers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'staff'
            }
        ],
        description: {
            type: String,
            require: [true, "Please provide description name"],
            trim: true,
        },
        subject_id: {
            type: String,
            required: [true, "Please provide a subject id"],
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
        year_version : {
            type : [String],
            default : []
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("subject", subjectScheme);