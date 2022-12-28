const mongoose = require("mongoose");


const student = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    mobile: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email address",
        ],
        unique: true,
    },
    password: {
        type: String,
        trim: true,
    },
    resetToken: {
        token: {
            type: String,
            default: null,
        },
        expiry: {
            type: Date,
            default: null,
        },
    },
    date: {
        type: Date,
        trim: true,
    },
    assign_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staff'
    },
    comment: {
        type: String,
        trim: true,
    },
    alternate_number: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ["HOT TA", "Enquiry Done", "Warn", "Cold", "Rejected"]
    },
    source: {
        type: String,
        enum: ["Justdail", "Sulekha", "Urbanpro", "Studysid", "Website", "Reference", "Seminar", "Walkin", "IC(Incoming Call)", "Google", "Facebook", "FBZapier", "Page", "FZGForm", "Learnyst", "New Sulekha", "Online Sulekha", "Online UrbanPro"]
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course'
        }
    ],
    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'center'
    },
    medium: {
        type: String,
        enum: ["English", "Hindi", "Other"]
    },
    city: {
        type: String,
        trim: true
    },
    payment_related: {
        gross_amount: {
            type: Number,
        },
        committed_amount: {
            type: Number,
        },
        bifuraction: [
            {
                name: {
                    type: String,
                },
                course_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'course'
                },
                fees: {
                    type: Number,
                },
                discount: {
                    type: Number,
                },
                net_fees: {
                    type: Number,
                }
            }
        ],

        fees: {
            date: Date,
            category: String,
            committed: Number,
            remaining: Number,
            paid_amount: Number,
            tax: {
                type: {
                    type: String,
                    enum: ["GST", "IGST", "SGST"]
                },
                txt_percent: Number,
                total_txt_amount: Number
            },
            payment_mode: String,
            remark: String,
            recepit: String,
            Emi_Id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'emi'
            }
        }
    }
},
    { timestamps: true }
);
module.exports = mongoose.model("student", student);