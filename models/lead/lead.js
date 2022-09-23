const mongoose = require("mongoose");

const leadScheme = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a name"],
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
            required: [true, "Please provide a email address"],
        },
        lead_date: {
            type: Date,
            trim: true,
            required: [true, "Please provide a lead_date"],
        },
        assign_to: {
            required: [true, "Please provide a assign_to"],
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
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("lead", leadScheme);