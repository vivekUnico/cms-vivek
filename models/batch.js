const mongoose = require("mongoose");

const batchScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please provide batch name"],
            trim: true,
        },
        center: {
            require: [true, "Please provide center"],
            trim: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'center'
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'course'
            }
        ],
        description: {
            type: String,
            require: [true, "Please provide description name"],
            trim: true,
        },
        batch_id: {
            type: String,
            unique: true,
            required: [true, "Please provide a batch id"],
        },

        batch_date: {
            start_date: {
                type: Date,
                required: [true,"Please provide a start date"]
            },
            end_date: Date
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("batch", batchScheme);