const ConnectDb = require('../config/db');
const Permission = require('../models/Permissions.js');

ConnectDb().then( async (db) => {
    const data = await Permission.create([
        { roll_name: "admin"},
        { roll_name: "manager"},
        { roll_name: "teacher"},
        { roll_name: "operations"},
        { roll_name: "sales"},
        { roll_name: "accountant"},
        { roll_name: "marketing"},
    ]);
});