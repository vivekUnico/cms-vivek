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
    NIPay : Number,
    BanckName:  String,
    cheque : string,
    city : string,
    date : Date,
    mode : {
        type: String,
        enum : ["Cash", "Cheque", "Online Gateway", "Demand Draft", 
            "Card Swipe", "Internet Banking", "Paytm", "Cash Deposit", 
            "Google Pay", "Phone Pay", "PayU Money", "Amazon Pay"],
    },
    modeDate : Date,
    paid : {
        type : Number,
        default: 0,
    },
    recepit : string,
    remark : string,
    tax : {
        type : string,
        enum : ['GST', 'IGST', 'CGST', 'SGST'],
    },
});

module.exports = mongoose.model("manual-emi", manualEmiScheme);