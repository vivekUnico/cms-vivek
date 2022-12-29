const ConnectDb = require('../config/db');
const Permission = require('../models/Permissions.js');

ConnectDb().then( async (db) => { // 63ad8d66dfdb35306d3d37b1
    const data = await Permission.create([
        { roll_name: "student" },
    ]);
});