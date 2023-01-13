const connectDB = require('../config/db.js');
const followup = require('../models/followup.js');
const leadAndEnquiry = require('../models/leadAndEnquiry/index.js');
const Permission = require('../models/Permissions.js');
connectDB().then( async (db) => {
    await Permission.updateMany({}, {
        $set: {
            block_staff: true,
            all_student: true,
            add_enquiry: true,
            add_lead: true,
        }
    })
});