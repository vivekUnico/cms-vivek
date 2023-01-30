// const { createZoomMeeting } = require("../utils/zoom");
// let zoomconfig = {
//     start_time : (new Date().toISOString()),
//     hostemail : "vivek.unicoglobal@gmail.com",
//     topic : "Maths",
//     duration : 60,
//     agenda: 'Online Lecture',
// }

// createZoomMeeting(zoomconfig).then((result) => {
//     console.log("got a result", result);
// }).catch(err => console.log("got an error", err));

// zqNYhHyom5pod7tz0MksG5LAnrVzyjCowXbU - secret

// 1EYt2ZxDQc6obqv5glD-Iw - key

// let date1 = new Date("2023-01-25T22:24:33.822Z");
// let date2 = new Date();
// console.log(date2 - date1);

const Config = require("../config/db");
const staff = require("../models/staff");
Config().then( async (result) => {
    await staff.findByIdAndUpdate("63c4d2fc2e51061da90d83a5", {
        $push: {
            subjects: "63c58f5b8ad8a6917f1b499d"
        }
    })
    await staff.findByIdAndUpdate("6392d78ad41fd249b71e8429", {
        $push: {
            subjects: "63c58f788ad8a6917f1b49c6"
        }
    })
}).catch(err => console.log("got an error", err));