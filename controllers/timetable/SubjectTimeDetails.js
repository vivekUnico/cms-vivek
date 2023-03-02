const SubjectTimeDetail = require('../../models/timetable/SubjectTimeDetails.js');
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { createZoomMeeting, updateMeeting } = require('../../utils/zoom.js');
const Batch = require('../../models/batch.js');
const ObjectId = require('mongoose').Types.ObjectId;
const { parseISO, sub, add } = require('date-fns');
const Feedback = require('../../models/feedback.js');
const Student = require('../../models/student/index.js');
const Attendance = require("../../models/attendance");

exports.CreateSubjectTimeTable = asyncHandler(async (req, res) => {
	try {
		let { DataArr } = req.body;
		if (!DataArr?.length)
			throw new ErrorResponse(`Array can not be empty`, 400);
		for (let i = 0; i < DataArr?.length; i += 1) {
			if (DataArr[i]?.start_time == undefined || DataArr[i]?.end_time == undefined)
				throw new ErrorResponse(`data Missing in Array`, 400);
			let result = await SubjectTimeDetail.findOne({
				$or: [
					{ start_time: { $gte: DataArr[i]?.start_time, $lt: DataArr[i]?.end_time } },
					{ end_time: { $gt: DataArr[i]?.start_time, $lt: DataArr[i]?.end_time } }
				],
				batch: DataArr[i]?.batch
			}).select("_id");
			if (result != null)
				throw new ErrorResponse(`A lecture is already created for this particular batch in the selected timeslot. Please choose a different timeslot`, 400);
			if (DataArr[i]?.lecture_type == "online") {
				let zoomconfig = {
					start_time: DataArr[i]?.start_time,
					hostemail: "chandan7666h@gmail.com" || DataArr[i]?.hostEmail,
					topic: DataArr[i]?.subjectName,
					duration: 60 || ((new Date(DataArr[i]?.end_time) - new Date(DataArr[i]?.start_time)) / (1000 * 60)),
					agenda: 'Online Lecture',
				}
				const zoomData = await createZoomMeeting(zoomconfig);
				DataArr[i].zoom_link = zoomData?.start_url;
			}
		}
		await SubjectTimeDetail.insertMany(DataArr || []);
		return res.status(200).json({ success: true });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 500);
	}
});

exports.GetSingleSubjectTimeTable = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params, populate = ["center", "batch", "subject", "teacher", "actual_teacher", "actual_subject"];
		let data = await SubjectTimeDetail.findById(id)
			.populate(populate?.map((item) => ({ path: item })));
		return res.status(200).json({ success: true, data });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 500);
	}
});

exports.GetAllSubjectTimeTable = asyncHandler(async (req, res) => {
	try {
		let Filter = [], temp = [];
		Filter = [{ ntime: { $gte: req.query["atime"] || "00:00" } }, { ntime: { $lte: req.query["etime"] || "23:59" } }]
		for (let key in req.query) {
			if (key == "pageno" || key == "limit" || key == "atime" || key == "etime" || key == "stdcont")
				continue;
			if (["batch._id", "center._id", "teacher._id"].includes(key))
				Filter.push({ [key]: ObjectId(req.query[key]) });
			else if (key == "start_time") {
				Filter.push({ start_time: { $gte: parseISO(req.query[key]) } });
			} else if (key == "end_time") {
				Filter.push({ start_time: { $lt: add(parseISO(req.query[key]), { days: 1 }) } });
			} else if (key == "topics") {
				temp = req.query[key]?.split(",").map((item) => ({ "topics": item }));
			} else if (key == "ActualStatus") {
				Filter.push({ [key]: (req.query[key] == "true") ? true : false });
			} else Filter.push({ [key]: { $regex: req.query[key] } });
		}
		if (temp?.length == 0) temp.push({});
		let data = await SubjectTimeDetail.aggregate([
			{
				$lookup: {
					from: "centers",
					let : { center: "$center" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$center"] } } },
						{ $project: { name: 1, _id : 1 } }
					],
					as: "center"
				}
			},
			{
				$lookup: {
					from: "batches",
					let : { batch: "$batch" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$batch"] } } },
						{ $project: { name: 1, _id : 1, courses : 1, academic_year : 1 } }
					],
					as: "batch"
				}
			},
			{
				$lookup: {
					from: "subjects",
					let : { subject: "$subject" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$subject"] } } },
						{ $project: { name: 1, _id : 1, master_id : 1, topics : 1 } }
					],
					as: "subject"
				}
			},
			{
				$lookup: {
					from: "staffs",
					let : { teacher: "$teacher" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$teacher"] } } },
						{ $project: { _id: 1, first_name: 1, last_name : 1 } }
					],
					as: "teacher"
				}
			},
			{
				$lookup: {
					from: "subjects",
					let : { actual_subject: "$actual_subject" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$actual_subject"] } } },
						{ $project: {_id : 1, name : 1 } }
					],
					as: "actual_subject"
				}
			},
			{
				$lookup: {
					from: "staffs",
					let : { actual_teacher: "$actual_teacher" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$actual_teacher"] } } },
						{ $project: {_id : 1 } }
					],
					as: "actual_teacher"
				}
			},
			{ $unwind: { path: "$center", preserveNullAndEmptyArrays: true } },
			{ $unwind: { path: "$batch", preserveNullAndEmptyArrays: true } },
			{ $unwind: { path: "$subject", preserveNullAndEmptyArrays: true } },
			{ $unwind: { path: "$teacher", preserveNullAndEmptyArrays: true } },
			{ $unwind: { path: "$actual_subject", preserveNullAndEmptyArrays: true } },
			{ $unwind: { path: "$actual_teacher", preserveNullAndEmptyArrays: true } },
			{
				$addFields: {
					ntime: {
						$dateToString: {
							format: "%H:%M",
							date: "$start_time",
							timezone: "Asia/Kolkata"
						}
					}
				}
			},
			{ $match: { $and: [...Filter, { $or: temp }] } },
			{ $sort: { start_time: 1 } },
			{ $skip: (parseInt(req.query.pageno) - 1) * parseInt(req.query.limit) },
			{ $limit: parseInt(req.query.limit) },
		]);
		let data1 = [], data2 = [];
		if (req.query?.stdcont == "true") {
			for (let i = 0; i < data.length; i++) {
				let a = Feedback.aggregate([
					{ $match: { subjectTimeDetails: ObjectId(data[i]._id) } },
					{
						$group: {
							_id: "$subjectTimeDetail",
							avg: { $avg: "$score" },
						}
					},
				]);
				let b = Student.aggregate([
					{ $match: { batch: ObjectId(data[i].batch._id) } },
					{ $count: "count" }
				]);
				let c = Attendance.aggregate([
					{ $match: { subjectTimeDetails: ObjectId(data[i]._id) } },
					{
						$group: {
							_id: "$subjectTimeDetails",
							value: { $push: "$present" },
						}
					},
				]);
				await Promise.all([a, b, c]).then((values) => {
					data1.push(values[0][0]?.avg || 0);
					data2.push({
						total: values[1][0]?.count || 0,
						present: values[2][0]?.value.filter((e) => e == "present").length || 0,
					});
				})
			}
		}
		return res.status(200).json({ success: true, data, avgFeed: data1, data2 });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 500);
	}
});

exports.UpdateSubjectTimeTable = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params, { lecture_type, AttandeceHardCopyLink } = req.body;
		const obj = { ...req.body };
		if (lecture_type == "online") {
			let zoomconfig = {
				start_time: obj?.start_time,
				hostemail: "chandan7666h@gmail.com" || obj?.hostEmail,
				topic: obj?.subjectName || "v1 subject",
				duration: 60 || ((new Date(obj?.end_time) - new Date(obj?.start_time)) / (1000 * 60)),
				agenda: 'Online Lecture',
			}
			const zoomData = await createZoomMeeting(zoomconfig);
			obj.zoom_link = zoomData?.start_url;
		}
		let data = await SubjectTimeDetail.findByIdAndUpdate(id, { $set: obj }, { new: true });
		return res.status(200).json({ success: true, data });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 500);
	}
});

exports.DeleteSubjectTimeTable = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		await SubjectTimeDetail.deleteOne({ _id: id });
		return res.status(200).json({ success: true });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 500);
	}
});


exports.GetTimeTableBySubjectId = asyncHandler(async (req, res) => {
	try {
		const { subjectId } = req.params;
		let data2 = await SubjectTimeDetail.aggregate([
			{ $match: { actual_subject: ObjectId(subjectId) } },
			{ $unwind: { path: "$completed_topics", preserveNullAndEmptyArrays: false } },
			{
				$group: {
					_id: "$batch",
					completed_topics: { $addToSet: "$completed_topics" },
				},
			},
		]);
		const data1 = await Batch.aggregate([
			{
				$lookup: {
					from: "courses",
					localField: "courses",
					foreignField: "_id",
					as: "courses"
				}
			},
			{ $unwind: { path: "$courses", preserveNullAndEmptyArrays: true } },
			{ $match: { "courses.subjects": ObjectId(subjectId) } },
		]);
		return res.status(200).json({ success: true, data2, data1 });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 500);
	}
});

exports.bulkUpdate = asyncHandler(async (req, res) => {
	try {
		const { IdArr } = req.query;
		let temp = IdArr.split(",")?.map(id => ObjectId(id)) || [];
		await SubjectTimeDetail.updateMany({ _id: { $in: temp } },
			{ $set: { ...req.body } }
		);
		return res.status(200).json({ success: true });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 500);
	}
});