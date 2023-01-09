const connectDB = require('../config/db.js');
const followup = require('../models/followup.js');
const leadAndEnquiry = require('../models/leadAndEnquiry/index.js');
connectDB().then( async (db) => {
    await followup.deleteMany({});
    await leadAndEnquiry.deleteMany({});
});