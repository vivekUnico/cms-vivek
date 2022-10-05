const mongoose = require("mongoose");

const BookReqIssuedScheme = new mongoose.Schema(
    {
        booksRequested: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'librarybook'
            }
        ],
        bookIssued: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'librarybook'
        }
        ,
        totalQty: {
            type: Number,
            trim: false,
            required: [true, "Please provide totalQty"],
        },
        requestedBy: {
            type: String,
            require: [false, "Please provide requestedBy"],
            trim: true,
        },
        issuedTo: {
            type: String,
            require: [false, "Please provide issuedTo"],
            trim: true,
        },
        returnBookDate: {
            type: Date,
            trim: false,
            required: [false, "Please provide returnBook"],
        },
        contactNumber: {
            type: Number,
            trim: false,
            required: [false, "Please provide contactNumber"],
        },
        type: {
            type: String,
            enum: ["request", "issue",],
            require: [true, "Please provide type"],
            trim: true,
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("librarybook-requested-issued", BookReqIssuedScheme);