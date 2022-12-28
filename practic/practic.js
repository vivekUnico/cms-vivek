const connectDB = require("../config/db.js");
const Permission = require("../models/Permissions.js");
connectDB().then(async (db) => {
    const data = await Permission.create([
        { roll_name: "teacher" },
        { roll_name: "student" },
        { roll_name: "sales" },
        { roll_name: "accountant" },
        { roll_name: "other" },
]);
    console.log(data);
});