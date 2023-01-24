const connectDB = require('../config/db.js');
const followup = require('../models/followup.js');
const leadAndEnquiry = require('../models/leadAndEnquiry/index.js');
const Permission = require('../models/Permissions.js');
const subject = require('../models/subject.js');
const course = require('../models/course.js');
const batch = require('../models/batch.js');
const Student = require('../models/student/index.js');
const ManualEmi = require('../models/emi/manualEmi.js');
const Emi = require('../models/emi/index.js');
connectDB().then( async (db) => {
    // await subject.deleteMany({ $or : [ {subject_id : "001"}, {subject_id : "002"}  ] });
    // await course.deleteMany({ $or : [ {course_id : "001"}, {course_id : "002"}  ] });
    // await batch.deleteMany({ $or : [ {batch_id : "001"}, {batch_id : "002"}  ] });
    // await followup.deleteMany({});
    // await leadAndEnquiry.deleteMany({});
    // await Student.deleteMany({});
    // await ManualEmi.deleteMany({});
    // await Emi.deleteMany({});
    await Permission.updateMany({}, {
        $set : {
            all_tickets_admin : true,
            all_tickets_filters_admin : true,
            view_ticket_admin : true,
            create_ticket_admin : true,
            edit_ticket_admin : true,
            delete_ticket_admin : true,
            change_assigned_admin : true,
            change_status_admin : true,
            all_infrastructure_admin : true,
            all_infrastructure_filter_admin : true,
            create_infrastructure_admin : true,
            edit_infrastructure_admin : true,
            delete_infrastructure_admin : true,
            all_vendors_admin : true,
            all_vendors_filter_admin : true,
            create_vendors_admin : true,
            edit_vendors_admin : true,
            delete_vendors_admin : true,
            view_vendors_admin : true,
            all_vendors_order_admin : true,
            all_vendors_order_filter_admin : true,
            create_vendors_order_admin : true,
            edit_vendors_order_admin : true,
            delete_vendors_order_admin : true,
            view_vendors_order_admin : true,
            all_physical_materials_admin : true,
            all_physical_materials_filter_admin : true,
            create_physical_materials_admin : true,
            edit_physical_materials_admin : true,
            delete_physical_materials_admin : true,
            all_contacts_admin : true,
            all_contacts_filter_admin : true,
            create_contacts_admin : true,
            edit_contacts_admin : true,
            delete_contacts_admin : true,
        }
    })
});