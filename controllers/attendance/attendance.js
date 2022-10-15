//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck } = require('../../middleware/validationCheck');

//models
const Attendance = require("../../models/attendance");

const { createFilter } = require('../../utils/filter');


exports.CreateAttendance = asyncHandler(async (req, res) => {
    try {
        const { created_by, data, attendance_type, created_by_type, submit_type } = req.body;
        const AttendanceD = {
            created_by, data, attendance_type, created_by_type, submit_type
        }

        const validation = validationCheck(
            AttendanceD
        );

        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        }

        const AttendanceData = await Attendance.create(AttendanceD);
        return res.status(201).json({ success: true, data: AttendanceData });

    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.UpdateAttendance = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Attendance id `, 400);

        const { created_by, data, attendance_type, created_by_type, submit_type } = req.body;
        const AttendanceD = {
            created_by, data, attendance_type, created_by_type, submit_type
        }

        const AttendanceData = await Attendance.findOneAndUpdate({ _id: id }, AttendanceD, { returnOriginal: false });
        if (!AttendanceData) throw new ErrorResponse(`Attendance not found`, 400);
        return res.status(201).json({ success: true, data: AttendanceData });

    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});



exports.getAttendance = asyncHandler(async (req, res) => {
    try {
        const { created_by, attendance_type, date_id, type, lecture, populate } = req.query;
        let filter = {};
        if (attendance_type) {
            filter = { attendance_type };
        }
        if (date_id) {
            filter = { ...filter, "data.date_id": date_id };
        }
        if (type) {
            filter = { ...filter, "created_by_type": type };
        }
        if (lecture) {
            filter = { ...filter, "data.timedetailId": { $in: String(lecture).split(",") } };
        }

        const AttendanceData = await Attendance.find({ ...filter }).populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(201).json({ success: true, data: AttendanceData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});