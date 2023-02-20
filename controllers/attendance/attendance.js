//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck } = require('../../middleware/validationCheck');

//models
const Attendance = require("../../models/attendance");

const { createFilter } = require('../../utils/filter');


// exports.CreateAttendance = asyncHandler(async (req, res) => {
//     try {
//         let { body } = req.body;
//         if(!body || body.length == 0) throw new ErrorResponse(`Please provide a body`, 400);

//         for (let i = 0; i < body.length; i++) {
//             const item = body[i];

//             const { created_by, data, attendance_type, created_by_type, submit_type } = item;
//             const AttendanceD = {
//                 created_by, data, attendance_type, created_by_type, submit_type
//             }

//             const validation = validationCheck(
//                 AttendanceD
//             );

//             if (!validation.status) {
//                 throw new ErrorResponse(`Please provide a ${validation.errorAt} in body at index ${i}`, 400);
//             }    
//         }


//         const AttendanceData = await Attendance.create(body);
//         return res.status(201).json({ success: true, data: AttendanceData });
//     } catch (error) {
//         throw new ErrorResponse(`Server error :${error}`, 400);
//     }
// });

// exports.UpdateAttendance = asyncHandler(async (req, res) => {
//     try {
//         const { id } = req.params;
//         if (!id) throw new ErrorResponse(`Please provide a Attendance id `, 400);

//         const { created_by, data, attendance_type, created_by_type, submit_type } = req.body;
//         const AttendanceD = {
//             created_by, data, attendance_type, created_by_type, submit_type
//         }

//         const AttendanceData = await Attendance.findOneAndUpdate({ _id: id }, AttendanceD, { returnOriginal: false });
//         if (!AttendanceData) throw new ErrorResponse(`Attendance not found`, 400);
//         return res.status(201).json({ success: true, data: AttendanceData });

//     } catch (error) {
//         throw new ErrorResponse(`Server error :${error}`, 400);
//     }
// });

// exports.DeleteAttendance = asyncHandler(async (req, res) => {
//     try {
//         const { id } = req.params;
//         if (!id) throw new ErrorResponse(`Please provide a Attendance id `, 400);

//         const AttendanceData = await Attendance.findByIdAndDelete(id);
//         if (!AttendanceData) throw new ErrorResponse(`Attendance not found`, 400);

//         return res.status(201).json({ success: true, data: `Attendance Deleted Successful` });
//     } catch (error) {
//         throw new ErrorResponse(`Server error :${error}`, 400);
//     }
// });



// exports.getAttendance = asyncHandler(async (req, res) => {
//     try {
//         const { created_by, attendance_type, date_id, type, subject,timedetailId,populate,submit_type } = req.query;
//         let filter = {};
//         if (attendance_type) {
//             filter = { attendance_type };
//         }
//         if (date_id) {
//             filter = { ...filter, "data.date_id": date_id };
//         }
//         if (type) {
//             filter = { ...filter, "created_by_type": type };
//         }
//         if (subject) {
//             filter = { ...filter, "data.subject": { $in: String(subject).split(",") } };
//         }
//         if (timedetailId) {
//             filter = { ...filter, "data.timedetailId": timedetailId };
//         }
//         if (submit_type) {
//             filter = { ...filter, submit_type };
//         }

//         const AttendanceData = await Attendance.find({ ...filter }).populate(populate?.split(",").map((item) => ({ path: item })));
//         return res.status(201).json({ success: true, data: AttendanceData });
//     } catch (error) {
//         throw new ErrorResponse(`Server error :${error}`, 400);
//     }
// });

exports.CreateAttendance = asyncHandler(async (req, res) => {
    try {
        let { body } = req.body;
        if(!body || body.length == 0) 
            throw new ErrorResponse(`Please provide a body`, 400);

        for (let i = 0; i < body.length; i++) {
            const item = body[i];

            const { attendance_type, present, subjectTimeDetails, submit_type } = item;
            const AttendanceD = {
                attendance_type, present, subjectTimeDetails, submit_type
            }
            const validation = validationCheck(
                AttendanceD
            );

            if (!validation.status) {
                throw new ErrorResponse(`Please provide a ${validation.errorAt} in body at index ${i}`, 400);
            }    
        }
        const AttendanceData = await Attendance.insertMany(body);
        return res.status(201).json({ success: true, data: AttendanceData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.UpdateAttendance = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params, { AttandeceHardCopyLink } = req.body;
        if (!id) throw new ErrorResponse(`Please provide a Attendance id `, 400);
        const AttendanceData = await Attendance.findOneAndUpdate({ _id: id }, 
            { $set: { ...req.body?.body } } , { new: true });
        if (!AttendanceData) throw new ErrorResponse(`Attendance not found`, 400);
        if (AttandeceHardCopyLink) {

        }
        return res.status(201).json({ success: true, data: AttendanceData });

    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.DeleteAttendance = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Attendance id `, 400);

        const AttendanceData = await Attendance.findByIdAndDelete(id);
        if (!AttendanceData) throw new ErrorResponse(`Attendance not found`, 400);

        return res.status(201).json({ success: true, data: `Attendance Deleted Successful` });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});



exports.getAttendance = asyncHandler(async (req, res) => {
    try {
        const { subjectTimeDetails, populate, pageno, limit, name, present } = req.query;
        let filter = {};
        if (name) {
            filter["name"] = { $regex: name, $options: "i" };
        }
        if (present) {
            filter["present"] = present;
        }
        const AttendanceData = await Attendance.find({ subjectTimeDetails, ...filter })
            .populate(populate?.split(",").map((item) => ({ path: item })))
            .skip((pageno - 1) * limit).limit(limit);
        return res.status(201).json({ success: true, data: AttendanceData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});