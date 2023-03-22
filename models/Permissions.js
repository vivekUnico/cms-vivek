const mongoose = require("mongoose");
const PermissionSchemma = new mongoose.Schema({
    roll_name : {
        type: String,
        enum: ["admin", "manager", "teacher", "operations", "sales", "accountant", "student" , "marketing"],
    },
    derived : {
        type: Boolean,
        default: false
    },
    parents : {
        type : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Permission"
        }],
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
    add_lead : {
        type: Boolean,
        default: false
    },
    add_enquiry : {
        type: Boolean,
        default: false
    },
    all_student: {
        type: Boolean,
        default: false
    },
    block_staff : {
        type: Boolean,
        default: false
    },
    all_tickets_admin : {
        type: Boolean,
        default: false
    },
    all_tickets_filters_admin : {
        type: Boolean,
        default: false
    },
    view_ticket_admin : {
        type: Boolean,
        default: false
    },
    create_ticket_admin : {
        type: Boolean,
        default: false
    },
    edit_ticket_admin : {
        type: Boolean,
        default: false
    },
    delete_ticket_admin : {
        type: Boolean,
        default: false
    },
    change_assigned_admin : {
        type: Boolean,
        default: false
    },
    change_status_admin : {
        type: Boolean,
        default: false
    },
    all_infrastructure_admin : {
        type: Boolean,
        default: false
    },
    all_infrastructure_filter_admin : {
        type: Boolean,
        default: false
    },
    create_infrastructure_admin : {
        type: Boolean,
        default: false
    },
    edit_infrastructure_admin : {
        type: Boolean,
        default: false
    },
    delete_infrastructure_admin : {
        type: Boolean,
        default: false
    },
    all_vendors_admin : {
        type: Boolean,
        default: false
    },
    all_vendors_filter_admin : {
        type: Boolean,
        default: false
    },
    create_vendors_admin : {
        type: Boolean,
        default: false
    },
    edit_vendors_admin : {
        type: Boolean,
        default: false
    },
    delete_vendors_admin : {
        type: Boolean,
        default: false
    },
    view_vendors_admin : {
        type: Boolean,
        default: false
    },
    all_vendors_order_admin : {
        type: Boolean,
        default: false
    },
    all_vendors_order_filter_admin : {
        type: Boolean,
        default: false
    },
    create_vendors_order_admin : {
        type: Boolean,
        default: false
    },
    edit_vendors_order_admin : {
        type: Boolean,
        default: false
    },
    delete_vendors_order_admin : {
        type: Boolean,
        default: false
    },
    view_vendors_order_admin : {
        type: Boolean,
        default: false
    },
    all_physical_materials_admin : {
        type: Boolean,
        default: false
    },
    all_physical_materials_filter_admin : {
        type: Boolean,
        default: false
    },
    create_physical_materials_admin : {
        type: Boolean,
        default: false
    },
    edit_physical_materials_admin : {
        type: Boolean,
        default: false
    },
    delete_physical_materials_admin : {
        type: Boolean,
        default: false
    },
    all_contacts_admin : {
        type: Boolean,
        default: false
    },
    all_contacts_filter_admin : {
        type: Boolean,
        default: false
    },
    create_contacts_admin : {
        type: Boolean,
        default: false
    },
    edit_contacts_admin : {
        type: Boolean,
        default: false
    },
    delete_contacts_admin : {
        type: Boolean,
        default: false
    },
    all_subjects_curriculum : {
        type: Boolean,
        default: false
    },
    all_subjects_curriculum_filter : {
        type: Boolean,
        default: false
    },
    create_subjects_curriculum : {
        type: Boolean,
        default: false
    },
    edit_subjects_curriculum : {
        type: Boolean,
        default: false
    },
    delete_subjects_curriculum : {
        type: Boolean,
        default: false
    },
    view_subjects_curriculum : {
        type: Boolean,
        default: false
    },
    edit_topics_curriculum : {
        type: Boolean,
        default: false
    },
    delete_topics_curriculum : {
        type: Boolean,
        default: false
    },
    all_courses_curriculum : {
        type: Boolean,
        default: false
    },
    all_courses_curriculum_filter : {
        type: Boolean,
        default: false
    },
    create_courses_curriculum : {
        type: Boolean,
        default: false
    },
    edit_courses_curriculum : {
        type: Boolean,
        default: false
    },
    delete_courses_curriculum : {
        type: Boolean,
        default: false
    },
    view_courses_curriculum : {
        type: Boolean,
        default: false
    },
    all_batches_curriculum : {
        type: Boolean,
        default: false
    },
    all_batches_curriculum_filter : {
        type: Boolean,
        default: false
    },
    create_batches_curriculum : {
        type: Boolean,
        default: false
    },
    edit_batches_curriculum : {
        type: Boolean,
        default: false
    },
    delete_batches_curriculum : {
        type: Boolean,
        default: false
    },
    view_batches_curriculum : {
        type: Boolean,
        default: false
    },
    all_timetable : {
        type: Boolean,
        default: false
    },
    all_timetable_filter : {
        type: Boolean,
        default: false
    },
    create_timetable_lectures : {
        type: Boolean,
        default: false
    },
    edit_timetable_lectures : {
        type: Boolean,
        default: false
    },
    delete_timetable_lectures : {
        type: Boolean,
        default: false
    },
    view_timetable_lectures : {
        type: Boolean,
        default: false
    },
    add_actuals_timetable : {
        type: Boolean,
        default: false
    },
    add_assignment_timetable : {
        type: Boolean,
        default: false
    },
    add_feedback_timetable : {
        type: Boolean,
        default: false
    },
    add_attendance_timetable : {
        type: Boolean,
        default: false
    },
    edit_attendance_timetable : {
        type: Boolean,
        default: false
    },
    view_actuals_timetable : {
        type: Boolean,
        default: false
    },
    view_assignment_in_lecture_timetable : {
        type: Boolean,
        default: false
    },
    view_feedback_in_lecture_timetable : {
        type: Boolean,
        default: false
    },
    view_attendance_in_lecture_timetable : {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model("permission", PermissionSchemma);