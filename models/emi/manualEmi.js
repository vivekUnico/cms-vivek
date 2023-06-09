const mongoose = require("mongoose");

const manualEmiScheme = new mongoose.Schema({
    remaining: { // 2
        type: Number,
        default: 0,
    },
    NIDate: {
        type: Date,
        default: new Date(),
    },
    NIPay: Number,
    banckName: String,
    paymentId : {
        type: String,
        required: [true, "Please add a paymentId"],
    },
    courses: {
        type : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "course",
            },
        ]
    },
    branchName: String,
    Emi_Id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "emi",
    },
    cheque: String,
    city: String,
    category: String,
    committed: Number,
    date: Date,
    payment_mode: {
        type: String,
        enum: ["Cash", "Cheque", "Online Gateway", "Demand Draft", "Card Swipe", "Internet Banking", 
        "Paytm", "Cash Deposit", "Google Pay", "Phone Pay", "PayU Money", "Amazon Pay"],
    },
    modeDate: Date,
    paid_amount: {
        type: Number,
        default: 0,
    },
    recepit: String,
    refNo: String,
    remark: String,
    tax: {
        type: {
            type: String,
            enum: ["GST", "IGST", "SGST"]
        },
    },
});

module.exports = mongoose.model("manual-emi", manualEmiScheme);