const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');

const { parseISO, sub, add } = require('date-fns');

//models
const Assignment = require('../../models/testsAssignment/assignment');
const { request } = require('express');
const ObjectId = require('mongoose').Types.ObjectId;
const { getCloudinaryUrl } = require('../../utils/cloudinary');
exports.createAssignment = asyncHandler(async (req, res) => {
	try {
		const AssignmentData = await Assignment.create(req.body);
		return res.status(201).json({ success: true, data: AssignmentData });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
})

exports.getAllAssignment = asyncHandler(async (req, res) => {
	try {
		let filter = [], temp;
		for (let key in req.query) {
			if (key == "pageno" || key == "limit") 
				continue;
			if (key == 'subjectTimeDetail' || key == 'subject' || key == 'batch') {
				filter.push({ [key]: new ObjectId(req.query[key]) })
			} else filter.push({ [key]: { $regex : req.query[key]} })
		}
		if (filter.length == 0) filter.push({});
		const result = await Assignment.aggregate([
			{ $match: { $and: filter } },
			{
				$lookup: {
					from: "subjecttimedetails",
					localField: "subjectTimeDetail",
					foreignField: "_id",
					as: "subjectTimeDetail"
				}
			}, {
				$lookup: {
					from: "subjects",
					localField: "subject",
					foreignField: "_id",
					as: "subject"
				}
			}, {
				$lookup: {
					from: "batches",
					localField: "batch",
					foreignField: "_id",
					as: "batch"
				}
			}, {
				$lookup: {
					from : "centers",
					localField : "center",
					foreignField : "_id",
					as : "center"
				}
			},
			{ $unwind: { path: "$subjectTimeDetail", preserveNullAndEmptyArrays: true } },
			{ $unwind: { path: "$subject", preserveNullAndEmptyArrays: true } },
			{ $unwind: { path: "$batch", preserveNullAndEmptyArrays: true } },
			{ $unwind: { path: "$center", preserveNullAndEmptyArrays: true } },
			{ $sort: { createdAt: -1 } },
			{ $skip : (parseInt(req.query.pageno) - 1) * parseInt(req.query.limit) },
      { $limit : parseInt(req.query.limit) },
		]);
		return res.status(200).json({ success: true, data: result });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
})

exports.getAssignmentsByteacher = asyncHandler(async (req, res) => {
	try {
		let filter = [];
		for (let key in req.query) {
			if (key == "pageno" || key == "limit") 
				continue;
			if (key == 'subjectTimeDetail._id' || key == 'subject' || key == 'batch' || key == 'subjectTimeDetail.teacher') {
				filter.push({ [key]: new ObjectId(req.query[key]) })
			} else filter.push({ [key]: { $regex : req.query[key]} })
		}
		if (filter.length == 0) filter.push({});
		const result = await Assignment.aggregate([
			{
				$lookup: {
					from: "subjecttimedetails",
					let : { subjectTimeDetail : "$subjectTimeDetail" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$subjectTimeDetail"] } } },
						{ $project: { start_time: 1, end_time: 1, subject: 1, _id: 1, teacher : 1 } },
					],
					as: "subjectTimeDetail",
				},
			},
			{
				$lookup: {
					from: "subjects",
					let : { subject : "$subject" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$subject"] } } },
						{ $project: { name: 1, _id: 1, topics : 1 } },
					],
					as: "subject",
				},
			},
			{
				$lookup: {
					from: "batches",
					let : { batch : "$batch" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$batch"] } } },
						{ $project: { name: 1, _id: 1 } },
					],
					as: "batch",
				},
			},
			{
				$lookup: {
					from: "centers",
					let : { center : "$center" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$center"] } } },
						{ $project: { name: 1, _id: 1 } },
					],
					as: "center",
				},
			},
			{ $unwind: { path: "$subjectTimeDetail", preserveNullAndEmptyArrays: true } },
			{ $unwind: { path: "$subject", preserveNullAndEmptyArrays: true } },
			{ $unwind: { path: "$batch", preserveNullAndEmptyArrays: true } },
			{ $unwind: { path: "$center", preserveNullAndEmptyArrays: true } },
			{ $match: { $and: filter } },
			{ $sort: { createdAt: -1 } },
			{ $skip : (parseInt(req.query.pageno) - 1) * parseInt(req.query.limit) },
      { $limit : parseInt(req.query.limit) },
		]);
		return res.status(200).json({ success: true, data: result });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
});

exports.getSingleAssignment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		throw new ErrorResponse(`Please provide id`, 400);
	}
	try {
		const AssignmentData = await Assignment.findOne({ _id: id }).populate("batch center subject subjectTimeDetail")
		return res.status(200).json({ success: true, data: AssignmentData });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
})

exports.updateAssignment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const result = await Assignment.findOneAndUpdate({ _id: id }, {
			$set : {
				...req?.body
			}
		}, { returnOriginal: true });
		return res.status(201).json({ success: true, data: result });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
});

exports.deleteAssignment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		throw new ErrorResponse(`Please provide id`, 400);
	}
	try {
		await Assignment.deleteOne({ _id: id });
		return res.status(201).json({ success: true, data: "Assignment Delete Successfully" });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
})

exports.createAssignmentSubmit = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { submitted_value, submitted_by, submission_type } = req.body;
	//type : normal | mcq
	const assignmentData = {
		submitted_value, submitted_by, submission_type
	}

	const validation = validationCheck({
		submitted_value, submitted_by, submission_type
	});

	if (!validation.status) {
		throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
	}
	const assignmentAssigned = await Assignment.findOne({ _id: id });
	if (!assignmentAssigned) {
		throw new ErrorResponse(`Please provide a valid assignment id `, 400);
	}
	try {
		delete assignmentAssigned._doc._id;
		const AssignmentData = await Assignment.create({ ...assignmentAssigned._doc, ...assignmentData, type: 'submission' });
		return res.status(201).json({ success: true, data: AssignmentData });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
})

exports.getAllAssignmentSubmission = asyncHandler(async (req, res) => {
	// const { } = req.params;
	const { name, timetable_datedetails, lecture_subject, center, course, batch, submissionDateTime, page, limit, populate, select } = req.query;
	const filter = createFilter([
		{ name: 'type', value: "submission" },
		{ name: 'name', value: name },
		{ name: 'timetable_datedetails', value: timetable_datedetails },
		{ name: 'lecture_subject', value: lecture_subject, type: 'array' },
		{ name: 'center', value: center, type: 'array' },
		{ name: 'course', value: course, type: 'array' },
		{ name: 'batch', value: batch, type: 'array' },
		{ name: 'submissionDateTime', value: submissionDateTime, type: 'date' },
	]);
	try {
		const AssignmentData = await Assignment.find({ ...filter }).select(select?.split(",")).limit(Number(limit)).skip(Number(page) * Number(limit)).sort({ createdAt: -1 }).populate(populate?.split(","));
		return res.status(200).json({ success: true, data: AssignmentData });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
})
