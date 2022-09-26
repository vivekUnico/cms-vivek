const mongoose = require("mongoose");

const studyMaterialScheme = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, "Please provide Title"],
        },
        description: {
            type: String,
            trim: false,
            required: [false, "Please provide description"],
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            require: [false, "Please provide Parent folder id"],
            trim: true,
            ref: 'studymaterial'
        },
        type: {
            type: String,
            enum: ["root", "pdf", "excel", "powerpoint", "word","folder"],
            require: [true, "Please provide folder/file type"],
            trim: true,
        },
        attachement: {
            // This is going to be a firebase download link
            type: String,
            trim: true,
            required: [false, "Please provide Attachement"],
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'course'
            }
        ],
        centers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'center'
            }
        ],
        isFree: {
            type: Boolean,
            trim: true,
            required: [false, "Please provide isFree"],
            default: true
        },
        showOnDashboard: {
            type: Boolean,
            trim: true,
            required: [false, "Please provide showOnDashboard"],
            default: true
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("studymaterial", studyMaterialScheme);