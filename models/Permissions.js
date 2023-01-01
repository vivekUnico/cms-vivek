const mongoose = require("mongoose");
const PermissionSchemma = new mongoose.Schema({
    roll_name : {
        type: String,
        enum: ["admin", "manager", "teacher", "operations", "sales", "accountant", "student" , "markting"],
    },
    create_followup_lead: {
        type: Boolean,
        default: false
    },
    all_lead: {
        type: Boolean,
        default: false
    },
    view_lead: {
        type: Boolean,
        default: false
    },
    edit_lead: {
        type: Boolean,
        default: false
    },
    delete_lead: {
        type: Boolean,
        default: false
    },
    leads_filter: {
        type: Boolean,
        default: false
    },
    all_followups_lead: {
        type: Boolean,
        default: false
    },
    edit_followup_lead: {
        type: Boolean,
        default: false
    },
    delete_followup_lead: {
        type: Boolean,
        default: false
    },
    create_followup_enquiry: {
        type: Boolean,
        default: false
    },
    all_enquiry: {
        type: Boolean,
        default: false
    },
    view_enquiry: {
        type: Boolean,
        default: false
    },
    edit_enquiry: {
        type: Boolean,
        default: false
    },
    delete_enquiry: {
        type: Boolean,
        default: false
    },
    enquiry_filter: {
        type: Boolean,
        default: false
    },
    all_followups_enquiry: {
        type: Boolean,
        default: false
    },
    edit_followup_enquiry: {
        type: Boolean,
        default: false
    },
    delete_followup_enquiry: {
        type: Boolean,
        default: false
    },
    add_student: {
        type: Boolean,
        default: false
    },
    view_student: {
        type: Boolean,
        default: false  
    },
    edit_student: {
        type: Boolean,
        default: false
    },
    delete_student: {
        type: Boolean,
        default: false
    },
    student_filter: {
        type: Boolean,
        default: false
    },
    block_student: {
        type: Boolean,
        default: false
    },
    student_fee: {
        type: Boolean,
        default: false
    },
    student_add_fee: {
        type: Boolean,
        default: false
    },
    student_edit_fee: {
        type: Boolean,
        default: false
    },
    student_delete_fee: {
        type: Boolean,
        default: false
    },
    student_all_fee: {
        type: Boolean,
        default: false
    },
    student_fee_filter: {
        type: Boolean,
        default: false
    },
    student_screening: {
        type: Boolean,
        default: false
    },
    student_screening_change : {
        type: Boolean,
        default: false
    },
    student_screening_filter: {
        type: Boolean,
        default: false
    },
    setting_permission: {
        type: Boolean,
        default: false
    },
    add_staff: {
        type: Boolean,
        default: false
    },
    view_staff: {
        type: Boolean,
        default: false
    },
    edit_staff: {
        type: Boolean,
        default: false
    },
    delete_staff: {
        type: Boolean,
        default: false
    },
    update_staff: {
        type: Boolean,
        default: false
    },
    staff_filter: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model("permission", PermissionSchemma);