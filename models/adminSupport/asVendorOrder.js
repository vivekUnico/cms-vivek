const mongoose = require("mongoose");

const orderScheme = new mongoose.Schema(
    {
        orderName: {
            type: String,
            trim: true,
            required: [true, "Please provide orderName"]
        },
        vendorId: {
            type: String,
            trim: true,
            required: [true, "Please provide vendorId"]
        },
        totalCost: {
            type: String,
            trim: true,
            required: [true, "Please provide totalCost"]
        },
        totalPaid: {
            type: String,
            trim: true,
            required: [true, "Please provide totalPaid"]
        },
        totalPending: {
            type: String,
            trim: true,
            required: [true, "Please provide totalPending"]
        },
        deliveryDate: {
            type: String,
            trim: true,
            required: [true, "Please provide deliveryDate"]
        },  
        orderStatus: {
            type: String,
            trim: true,
            required: [true, "Please provide orderStatus"]
        },  
        quotetion: {
            type: Array,
            default:[]
        }, 
        invoice: {
            type: Array,
            default:[]

        }, 
    },
    { timestamps: true }
);
module.exports = mongoose.model("asVendorOrder", orderScheme);