//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck } = require('../../middleware/validationCheck');

//models
const Attendance = require("../../models/attendance");
let ObjectId = require('mongoose').Types.ObjectId;
exports.CreateAttendance = asyncHandler(async (req, res) => {
	try {
		let { body } = req.body;
		if (!body || body.length == 0)
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
			{ $set: { ...req.body?.body } }, { new: true });
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

exports.getAttendanceForStudent = asyncHandler(async (req, res) => {
	try {
		let { studentId, pageno, limit } = req.query;
		if (!studentId) throw new ErrorResponse(`Please provide a studentId`, 400);
		let result = await Attendance.aggregate([
			{ $match: { studentId : ObjectId(studentId) } },
			{
				$lookup: {
					from: "subjecttimedetails",
					let : { subjectTimeDetails : "$subjectTimeDetails" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$subjectTimeDetails"] } } },
						{ $project: { start_time: 1, end_time: 1, subject: 1, _id: 1 } },
					],
					as: "subjectTimeDetails",
				},
			},
			{ $unwind: { path: "$subjectTimeDetails", preserveNullAndEmptyArrays: false } },
			{
				$lookup: {
					from: "subjects",
					let: { subject: "$subjectTimeDetails.subject" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$subject"] } } },
						{ $project: { name: 1, _id: 1, master_id: 1 } },
					],
					as: "subjectTimeDetails.subject"
				}
			},
			{ $unwind: { path: "$subjectTimeDetails.subject", preserveNullAndEmptyArrays: true } },
			{ $sort: { createdAt: -1 } },
			{ $skip: (parseInt(pageno) - 1) * parseInt(limit) },
			{ $limit: parseInt(limit) },
		]);
		return res.status(201).json({ success: true, data: result });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
});