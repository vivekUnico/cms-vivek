const mongoose = require("mongoose");

const vendorScheme = new mongoose.Schema(
    {
        vendorName: {
            type: String,
            trim: true,
            required: [true, "Please provide resolution"]
        },
        kpc: {
            type: String,
            trim: true,
            required: [true, "Please provide kpc"]
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
        websiteURL: {
            type: String,
            required: [true, "Please provide websiteURL"],
            trim: true,
        },
        typeOfVendor: {
            type: String,
            required: [true, "Please provide typeOfVendor"],
            trim: true,
        },
        RegisteredOn: {
            type: String,
            required: [true, "Please provide RegisteredOn"],
            trim: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("asVendors", vendorScheme);