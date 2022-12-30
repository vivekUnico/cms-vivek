const mongoose = require("mongoose");

let mainSchema = {
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
        enum: ["HOT", "WARM", "COLD", "REJECTED"]
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
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'batch'
    },
    city: {
        type: String,
        trim: true
    },
    type : {
        type: String,
        enum: ["Online", "Offline", "Blended"]
    },
    telegram: {
        type: String,
        trim: true,
    },
}

const leadAndEnquiry = new mongoose.Schema({
    ...mainSchema,
    currentStatus: {
        type: String,
        enum: ["lead", "enquiry","student"]
    },
    isLead: {
        type: Boolean,
        default: false
    },
    isEnquiry: {
        type: Boolean,
        default: false
    },
    enquiry_data: {
        ...mainSchema,
        gross_amount: {
            type: Number,
        },
        committed_amount: {
            type: Number,
        },
        bifurcation: [
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
            Emi_Id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'emi'
            }
        }
    }
},
    { timestamps: true }
);
module.exports = mongoose.model("lead-and-enquiry", leadAndEnquiry);