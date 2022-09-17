const mongoose = require("mongoose");

const centerScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please provide center name"],
            trim: true,
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("center", centerScheme);