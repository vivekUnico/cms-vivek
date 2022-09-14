const mongoose = require("mongoose");

const subjectScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please provide subject name"],
            trim: true,
        },
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
        description: {
            type: String,
            require: [true, "Please provide description name"],
            trim: true,
        },
        subject_id: {
            type: String,
            unique: true,
            required: [true, "Please provide a subject id"],
        },
        master_id: {
            type: String,
            trim: true,
        },
        academic_year: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("subject", subjectScheme);