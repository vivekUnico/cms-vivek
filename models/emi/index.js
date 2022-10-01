const mongoose = require("mongoose");

const emiScheme = new mongoose.Schema(
    {
        applied_from: {
            type: Date,
            required: [true, "Please provide a emi applied_from"],
        },
        repeat: {
            type: String,
            enum: ['7 Days', '15 Days', '1 Month', '2 Month', '3 Month', '3.5 Month', '4 Month', '6 Month', '9 Month', '1 Year'],
            required: [true, "Please provide a emi applied_from"],
        },
        type: {
            type: String,
            required: [true, "Please provide a emi type"],
        },
        total_emi: {
            type: Number,
            required: [true, "Please provide a total_emi"],
        },
        total_amount: {
            type: Number,
            required: [true, "Please provide a emi total_amount"],
        },
        emi_list: [
            {
                amount: {
                    type: Number,
                    required: [true, "Please provide a emi_list amount"],
                },
                date: {
                    type: Date,
                    default: new Date(),
                    required: [true, "Please provide a emi_list date"],
                },
                paid: {
                    type: Boolean,
                    default: false
                },
                payment_mode: {
                    type: String
                },
            }
        ]
    },
    { timestamps: true }
);
module.exports = mongoose.model("emi", emiScheme);