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
const course = require("../models/course");
const subjectTimeTable = require('../models/timetable/SubjectTimeDetails.js')
const LeadAndEnquiry = require("../models/leadAndEnquiry");
Config().then( async (result) => {
    // for (let i = 0; i < 12; i++) {
    //     await LeadAndEnquiry.create({
    //         name: `vijay ${i}`,
    //         email: `vijay${2 * i}@gmail.com`,
    //         mobile: `123456789${i}`,
    //         gender : 'male',
    //         isLead : true,
    //         isEnquiry : false,
    //         currentStatus : 'lead',
    //         created_by : '63aef76005f9c2538b7d621b',
    //         date : "2023-02-23T18:30:00.000+00:00",
    //         enquiry_data : {
    //             course : [],
    //             bifurcation : [],
    //         },
    //         center :  "63298dd027e32b6c45239f1d",
    //         course : [],
    //         status : "WARM"
    //     })
    // }
    await LeadAndEnquiry.updateMany({}, {
        $set : {
            courses : ["63c861a4580ff496c4ab781a", "63c7ad7d580ff496c4ab2bbb"],
        }
    })
}).catch(err => console.log("got an error", err));