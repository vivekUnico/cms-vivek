const mongoose = require("mongoose");

const contactScheme = new mongoose.Schema(
    {
        contactName: {
            type: String,
            trim: true,
            required: [true, "Please provide contactName"]
        },
        center: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'center',
            required: [true, "Please provide center"],
        },
        email: {
            type: String,
            match: [
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email address",
            ],
            unique: true,
            required: [true, "Please provide a email address"],
        },
        phone: {
            type: String,
            required: [true, "Please provide phone"],
            trim: true,
        },
        comment: {
            type: String,
            required: [true, "Please provide comment"],
            trim: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("asContact", contactScheme);