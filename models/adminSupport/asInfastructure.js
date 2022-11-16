const mongoose = require("mongoose");

const infastructureScheme = new mongoose.Schema(
    {
        assetName: {
            type: String,
            trim: true,
            required: [true, "Please provide assetName"]
        },
        center: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'center',
            required: [true, "Please provide center"],
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'staff',
            required: [true, "Please provide assignedTo"]
        },
        assignedOn: {
            type: Date,
            required: [true, "Please provide assignedOn"]
        },
        liabilities: {
            type: String,
            trim: true,
            required: [true, "Please provide liabilities"]
        },
        tc: {
            type: String,
            required: [true, "Please provide terms & condition"]
        },
        files: [{
            type: String,
        }]
    },
    { timestamps: true }
);
module.exports = mongoose.model("asInfastructure", infastructureScheme);