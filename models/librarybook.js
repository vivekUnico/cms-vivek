const mongoose = require("mongoose");

const LibraryScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide name"],
        },
        bookid: {
            type: String,
            trim: false,
            required: [true, "Please provide bookid"],
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'course'
            }
        ],
        totalBooks: {
            type: Number,
            trim: false,
            required: [false, "Please provide totalBooks"],
        },
        totalReq: {
            type: Number,
            trim: false,
            required: [false, "Please provide totalReq"],
            default: 0
        },
        totalIssued: {
            type: Number,
            trim: false,
            required: [false, "Please provide totalIssued"],
            default: 0
        },
        totalReturned: {
            type: Number,
            trim: false,
            required: [false, "Please provide totalReturned"],
            default: 0

        },
        addedby: {
            type: mongoose.Schema.Types.ObjectId,
            require: [false, "Please provide Paddedby"],
            trim: true,
            ref: 'staff'
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("librarybook", LibraryScheme);