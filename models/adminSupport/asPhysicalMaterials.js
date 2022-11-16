const mongoose = require("mongoose");

const physicalMaterialScehme = new mongoose.Schema(
    {
        materialName: {
            type: String,
            trim: true,
            required: [true, "Please provide materialName"]
        },
        totalQty: {
            type: String,
            trim: true,
            required: [true, "Please provide totalQty"]
        },
        totalAvailable: {
            type: Number,
            trim: true,
            required: [true, "Please provide totalAvailable"]
        },
        totalRemaining: {
            type: Number,
            trim: true,
            required: [true, "Please provide totalRemaining"]
        },
        totalUsed: {
            type: Number,
            trim: true,
            required: [true, "Please provide totalUsed"]
        },
        center: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'center',
            required: [true, "Please provide center"],
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course',
            required: [true, "Please provide course"],
        },
        purpose: {
            type: String,
            trim: true,
            required: [true, "Please provide purpose"]
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("asPhysicalMaterial", physicalMaterialScehme);