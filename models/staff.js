const mongoose = require("mongoose");

const staffScheme = new mongoose.Schema({
    initial: {
        type: String,
        enum: ["Mr.", "Ms.", "Mrs.", "Miss", "Dr.", "Er.", "Master"],
        // required: [true, "Please provide initial"]
    },
    first_name: {
        type: String,
        required: [true, "Please provide first_name"],
        trim: true,
    },
    last_name: {
        type: String,
        // required: [true, "Please provide last_name"],
        trim: true,
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
    mobile: {
        type: String,
        required: [true, "Please provide mobile"],
        trim: true,
    },
    dob: {
        type: Date,
        // required: [true, "Please provide dob"],
    },
    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'center',
        required: [true, "Please provide center"],
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
    }],
    total_leave: {
        type: Number,
        default: 0
    },
    staffCode: {
        type: String,
        required: [true, "Please provide staffCode"],
        trim: true,
        unique: true,
    },
    salary_type: {
        type: String,
        enum: ["Both", "Monthly", "Lecture-wise"],
        // required: [true, "Please provide salary_type"]
    },
    loginId: {
        type: String,
        // required: [true, "Please provide loginId"],
        trim: true,
        // unique: true,
    },
    role: {
        type: String,
        // enum: ["admin", "manager", "employee", "sales", "marketing", "teacher", "accountant"],
        // required: [true, "Please provide role"],
        trim: true,
    },
    permission_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'permission',
        // required: [true, "Please provide permission_id"],
    },
    department: {
        type: String,
        // required: [true, "Please provide department"],
        trim: true,
    },
    position: {
        type: String,
        enum: ["admin", "manager", "employee", "sales", "marketing", "teacher", "accountant", "student"],
        // required: [true, "Please provide position"],
        trim: true,
    },
    grade: {
        type: String,
        // required: [true, "Please provide grade"],
        trim: true,
    },
    shift: {
        type: String,
        enum: ["Day Shift 10-7", "Part Time Shift"],
        // required: [true, "Please provide shift"]
    },
    qualification: {
        type: String,
        enum: ["graduate", "post graduate", "under graduate"],
        // required: [true, "Please provide qualification"]
    },
    manager: {
        type: String,
        // required: [true, "Please provide manager"],
        trim: true
    },
    joining_date: {
        type: Date,
        // required: [true, "Please provide joining_date"]
    },
    job_type: {
        type: String,
        enum: ["full time", "part time", "probation internship"],
        // required: [true, "Please provide job_type"]
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: [true, "Please provide gender"]
    },
    account_status: {
        type: String,
        enum: ["active", "block", "old"],
        // required: [true, "Please provide account_status"]
    },
}, { timestamps: true }
);
module.exports = mongoose.model("staff", staffScheme);