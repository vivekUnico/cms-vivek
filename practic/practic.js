const connectDB = require('../config/db.js');
const followup = require('../models/followup.js');
const leadAndEnquiry = require('../models/leadAndEnquiry/index.js');
connectDB().then( async (db) => {
    await followup.deleteMany({});
    await leadAndEnquiry.deleteMany({});
});
// {createdAt:{$gte:ISODate(“2020-03-01”),$lt:ISODate(“2021-04-01”)}}