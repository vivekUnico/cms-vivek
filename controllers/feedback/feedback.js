//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck } = require('../../middleware/validationCheck');

//models
const Feedback = require("../../models/feedback");
//Create Single Followup, Update Single Followup
// exports.CreateFeedback = asyncHandler(async (req, res) => {
//     try {
//         const { feedback, created_by, data, feedback_type, created_by_type, submit_type } = req.body;
//         const feedbackD = {
//             created_by, data, feedback_type, created_by_type, submit_type
//         }

//         const validation = validationCheck(
//             feedbackD
//         );

//         if (!validation.status) {
//             throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
//         }

//         const feedbackData = await Feedback.create({ ...feedbackD, feedback });
//         return res.status(201).json({ success: true, data: feedbackData });

//     } catch (error) {
//         throw new ErrorResponse(`Server error :${error}`, 400);
//     }
// });

// exports.UpdateFeedback = asyncHandler(async (req, res) => {
//     try {
//         const { id } = req.params;
//         if (!id) throw new ErrorResponse(`Please provide a Feedback id `, 400);

//         const { feedback, created_by, data, feedback_type, created_by_type, submit_type } = req.body;
//         const feedbackD = {
//             feedback, created_by, data, feedback_type, created_by_type, submit_type
//         }

//         const feedbackData = await Feedback.findOneAndUpdate({ _id: id }, feedbackD, { returnOriginal: false });
//         if (!feedbackData) throw new ErrorResponse(`Feedback not found`, 400);
//         return res.status(201).json({ success: true, data: feedbackData });

//     } catch (error) {
//         throw new ErrorResponse(`Server error :${error}`, 400);
//     }
// });



// exports.getFeedback = asyncHandler(async (req, res) => {
//     try {
//         const { created_by, feedback_type, date_id, populate, attendance_type, type, lecture, submit_type } = req.query;
//         let filter = {};
//         if (attendance_type) {
//             filter = { attendance_type };
//         }
//         if (date_id) {
//             filter = { ...filter, "data.date_id": date_id };
//         }
//         //optional
//         if (type) {
//             filter = { ...filter, "created_by_type": type };
//         }
//         if (lecture) {
//             filter = { ...filter, "data.lecture_id": { $in: String(lecture).split(",") } };
//         }
//         if (submit_type) {
//             filter = { ...filter, submit_type };
//         }


//         const feedbackData = await Feedback.find({ ...filter }).populate(populate?.split(",").map((item) => ({ path: item })));
//         return res.status(201).json({ success: true, data: feedbackData });

//     } catch (error) {
//         throw new ErrorResponse(`Server error :${error}`, 400);
//     }
// });
let ObjectId = require('mongoose').Types.ObjectId;
exports.CreateFeedback = asyncHandler(async (req, res) => {
	try {
		let result = await Feedback.create(req.body);
		return res.status(201).json({ success: true, data: result });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error?.message}`, 400);
	}
});

exports.UpdateFeedback = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) throw new ErrorResponse(`Please provide a Feedback id `, 400);

		const feedbackData = await Feedback.findOneAndUpdate({ _id: id }, {
			$set: { ...req.body }
		}, { new: true });
		if (!feedbackData) throw new ErrorResponse(`Feedback not found`, 400);
		return res.status(201).json({ success: true, data: feedbackData });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
});

exports.getFeedbackForStudent = asyncHandler(async (req, res) => {
	console.log(req.query);
	try {
		let { studentId, pageno, limit, created_for_staff } = req.query;
		let Filter = {};
		if (created_for_staff) {
			Filter['created_for_staff'] = ObjectId(created_for_staff);
		}
		if (studentId) {
			Filter['created_student'] = ObjectId(studentId);
		}
		let result = await Feedback.aggregate([
			{ $match: { ...Filter } },
			{
				$lookup: {
					from: "subjecttimedetails",
					let: { subjectTimeDetails: "$subjectTimeDetails" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$subjectTimeDetails"] } } },
						{ $project: { start_time: 1, end_time: 1, actual_subject: 1, _id: 1 } },
					],
					as: "subjectTimeDetails"
				}
			},
			{ $unwind: { path: "$subjectTimeDetails", preserveNullAndEmptyArrays: false } },
			{
				$lookup: {
					from: "subjects",
					let: { subject: "$subjectTimeDetails.actual_subject" },
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

exports.getFeedback = asyncHandler(async (req, res) => {
	try {
		let { subjectTimeDetails, pageno, limit, populate } = req.query;
		let result = await Feedback.find({ subjectTimeDetails })
			.populate(populate?.split(",").map((item) => ({ path: item })))
			.sort({ createdAt: -1 }).skip((parseInt(pageno) - 1) * parseInt(limit)).limit(parseInt(limit));
		return res.status(201).json({ success: true, data: result });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
});