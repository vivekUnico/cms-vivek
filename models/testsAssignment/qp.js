const mongoose = require("mongoose");

const questionPaperScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please provide name"],
            trim: true,
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            require: [true, "Please provide subject "],
            trim: true,
            ref: "subject"
        },
        center: {
            type: mongoose.Schema.Types.ObjectId,
            require: [true, "Please provide center "],
            trim: true,
            ref: "center"
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            require: [true, "Please provide course "],
            trim: true,
            ref: "course"
        },
        batch: {
            type: mongoose.Schema.Types.ObjectId,
            require: [true, "Please provide batch name"],
            trim: true,
            ref: "batch"
        },
        testDate: {
            type: Date,
            require: [true, "Please provide testDate"],
            trim: true,
        },
        testType: {
            type: String,
            enum: ["online", "offline"],
            require: [true, "Please provide testType"],
            trim: true,
        },
        totalMarks: {
            type: String,
            require: [true, "Please provide marks"],
            trim: true,
        },
        // After creation update below fields
        bannerInstructionFirst: {
            type: String,
            require: [false, "Please provide banner Instruction First"],
            trim: true,
        },
        bannerInstructionSecond: {
            type: String,
            require: [false, "Please provide banner Instruction Second"],
            trim: true,
        },
        bannerLabel: {
            type: String,
            require: [false, "Please provide banner Label"],
            trim: true,
        },
        tbc: {
            type: String,
            require: [false, "Please provide T.B.C"],
            trim: true,
        },
        testbookletseries: {
            type: String,
            require: [false, "Please provide Test Booklet Series"],
            trim: true,
        },
        serialno: {
            type: String,
            require: [false, "Please provide Serial No"],
            trim: true,
        },
        timeallowed: {
            type: String,
            require: [true, "Please provide Time allowed"],
            trim: true,
        },
        
    },
    { timestamps: true }
);
module.exports = mongoose.model("questionPaper", questionPaperScheme);
