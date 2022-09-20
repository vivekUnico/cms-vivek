const mongoose = require("mongoose");

const staffScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please provide staff name"],
            trim: true,
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("staff", staffScheme);