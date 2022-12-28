const mongoose = require("mongoose");

const manualEmiScheme = new mongoose.Schema({
    remainning_amount: {
        type: Number,
        default: 0,
    },
    NIDate: {
        type: Date,
        default: new Date(),
    },
    NIPay: Number,
    BanckName: String,
    cheque: String,
    city: String,
    date: Date,
    mode: {
        type: String,
        enum: ["Cash", "Cheque", "Online Gateway", "Demand Draft",
            "Card Swipe", "Internet Banking", "Paytm", "Cash Deposit",
            "Google Pay", "Phone Pay", "PayU Money", "Amazon Pay"],
    },
    modeDate: Date,
    paid: {
        type: Number,
        default: 0,
    },
    recepit: String,
    remark: String,
    tax: {
        type: String,
        enum: ['GST', 'IGST', 'CGST', 'SGST'],
    },
});

module.exports = mongoose.model("manual-emi", manualEmiScheme);