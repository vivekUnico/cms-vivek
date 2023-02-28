//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ObjectId = require('mongoose').Types.ObjectId;
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, validationImportent } = require('../../middleware/validationCheck');
const { EmailNoteficationForLeadAndEnquiry, AssignToEmailNotefication } = require('../../middleware/EmailNotefication');
//models
const Followup = require("../../models/followup");
const Staff = require("../../models/staff");
const LeadAndEnquiry = require("../../models/leadAndEnquiry");
const { PermissionAuthenctication } = require('../../middleware/apiAuth');
const { parseISO, sub, add } = require('date-fns');
const leadAndEnquiry = require('../../models/leadAndEnquiry');

exports.GetFollowupByFilter = asyncHandler(async (req, res) => {
	try {
		let str1 = req.query["followup_type"] == "lead" ?
			"all_followups_lead" : "all_followups_enquiry";
		let permission = await PermissionAuthenctication(req.headers, str1);
		if ((!permission.success) && req.query["created_by"] == undefined) {
			throw new ErrorResponse(`You are not authorized to access this route`, 401);
		}
		let temp = [], Arr = [], Arr1 = [];
		for (let key in req.query) {
			if (key.includes("pageno") || key == "limit")
				continue;
			if ((key == "created_by" || key == "followup_list.followup_by._id"))
				Arr1.push({ [key]: ObjectId(req.query[key]) });
			else if (key.includes("courses")) {
				(req.query[key].split(',')).map(val => {
					Arr.push({ [key]: ObjectId(val) })
				});
			} else if (key == "date") {
				let date = parseISO(req.query[key]);
				let date2 = add(date, { days: 1 });
				temp.push({ "followup_list.date": { $gte: date, $lt: date2 } });
			}
			else temp.push({ [key]: { $regex: req.query[key] } });
		}
		if (Arr.length == 0) Arr.push({});
		if (Arr1.length == 0) Arr1.push({});
		console.log(req.query);
		let data = await Followup.aggregate([
			{ $addFields: { "followup_list_length": { $size: "$followup_list" } } },
			{ $unwind: { path: "$followup_list", preserveNullAndEmptyArrays: true } },
			{
				$lookup: {
					from: "staffs",
					localField: "followup_list.followup_by",
					foreignField: "_id",
					as: "followup_list.followup_by"
				}
			},
			{ $unwind: { path: "$followup_list.followup_by", preserveNullAndEmptyArrays: true } },
			{
				$lookup: {
					from: "lead-and-enquiries",
					localField: "connection_id",
					foreignField: "_id",
					as: "connection_id"
				}
			},
			{ $unwind: { path: "$connection_id", preserveNullAndEmptyArrays: true } },
			{ $match: { $and: [...temp, { $or: Arr }, { $or: Arr1 }] } },
			{
				$group: {
					_id: null,
					allData: { $push: "$$ROOT" },
					Totalcount: { $sum: 1 }
				}
			},
			{ $unwind: { path: "$allData", preserveNullAndEmptyArrays: true } },
			{ $sort: { "allData.followup_list.addedTime": -1 } },
			{ $skip: (parseInt(req.query.pageno) - 1) * parseInt(req.query.limit) },
			{ $limit: parseInt(req.query.limit) },
			{ $replaceRoot: { newRoot: { $mergeObjects: ["$allData", { total_count: "$Totalcount" }] } } },
		]);
		console.log(data.length);
		return res.status(200).json({ success: true, data });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 500);
	}
});

exports.UpdateSingleFollowup = asyncHandler(async (req, res) => {
	try {
		const { connection_id, addedTime } = req.params;
		const { date, followup_by, comment, followup_type } = req.body;
		let str1 = (followup_type == "lead") ? "edit_followup_lead" : "edit_followup_enquiry";
		let permission = await PermissionAuthenctication(req.headers, str1);
		if (!permission.success) {
			throw new ErrorResponse(`You are not authorized to access this route`, 401);
		}
		let validation = validationCheck({ connection_id, addedTime, date, followup_by, comment });
		if (!validation.status)
			throw new ErrorResponse(validation.message, 400);
		let data = await Followup.findOne({ connection_id });
		if (!data) throw new ErrorResponse("Followup not found", 404);
		let index = data.followup_list.findIndex((item) => item.addedTime.toISOString() == addedTime);
		if (index == -1) throw new ErrorResponse("Followup not found", 404);
		data.followup_list[index].date = date;
		data.followup_list[index].followup_by = followup_by;
		data.followup_list[index].comment = comment;
		await data.save();
		return res.status(200).json({ success: true, data });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 500);
	}
});

exports.newDeleteSingleFollowup = asyncHandler(async (req, res) => {
	try {
		const { connection_id, addedTime } = req.params;
		let validation = validationCheck({ connection_id, addedTime });
		if (!validation.status)
			throw new ErrorResponse(validation.message, 400);
		let data = await Followup.findOne({ connection_id: connection_id });
		if (data === null) {
			throw new ErrorResponse("Followup not found", 404);
		}
		let index = data.followup_list.findIndex((item) => item.addedTime.toISOString() == addedTime);
		if (index == -1) {
			throw new ErrorResponse("Followup not found", 404);
		}
		data.followup_list.splice(index, 1);
		await data.save();
		return res.status(200).json({ success: true, data });
	} catch (error) {
		console.log("correct");
		throw new ErrorResponse(`Server error :${error}`, 500);
	}
});

//Get All Followup
exports.GetAllFollowup = asyncHandler(async (req, res) => {
	try {
		let { populate, created_by, followup_type, followup_by } = req.query;
		console.log(req.query);
		let filter = {};
		if (followup_type) {
			filter["followup_type"] = String(followup_type);
		}
		let str1 = (followup_type == "lead") ? "all_followups_lead" : "all_followups_enquiry";
		let permission = await PermissionAuthenctication(req.headers, str1);
		if (!permission.success) {
			throw new ErrorResponse(`You are not authorized to access this route`, 401);
		}
		if (created_by) {
			filter["$or"] = [
				{ created_by: String(created_by) }
			];
		}
		if (followup_by) {
			if (filter["$or"]) {
				filter["$or"] = [
					...filter["$or"],
					{ "followup_list.followup_by": String(followup_by) }
				];
			} else {
				filter["$or"] = [
					{ "followup_list.followup_by": String(followup_by) }
				];
			}
		}
		let data = await Followup.find({ ...filter }).populate(populate?.split(",").map((item) => ({ path: item })))
		return res.status(200).json({ success: true, filter, data });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
});

//Get All Followup By (Lead,Enquiry)
exports.GetSingleFollowup = asyncHandler(async (req, res) => {
	try {
		const { connection_id } = req.params;
		if (!connection_id) throw new ErrorResponse(`Please provide a followup connection_id `, 400);

		let { populate } = req.query;

		const data = await Followup.find({ connection_id }).populate(populate?.split(",").map((item) => ({ path: item })));
		return res.status(200).json({ success: true, data });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
});

//Create Single Followup, Update Single Followup
exports.CreateFollowup = asyncHandler(async (req, res) => {
	try {
		console.log("followup", req.body);
		const { followup_type, connection_id, created_by, followup_list, followupName } = req.body;
		let validation = await validationCheck({ followup_type, connection_id, created_by, followup_list });
		let str1 = (followup_type == "lead") ? "create_followup_lead" : "create_followup_enquiry";
		let permission = await PermissionAuthenctication(req.headers, str1);
		if (!permission.success) {
			throw new ErrorResponse(`You are not authorized to access this route`, 401);
		}
		if (!validation.status) {
			throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
		} else if (!followup_list) {
			throw new ErrorResponse(`Please provide followup_list`, 400);
		};

		let check = await LeadAndEnquiry.findById(connection_id), temp1 = "";
		if (!check) throw new ErrorResponse(`connection_id not found`, 400);
		if (followup_list[followup_list?.length - 1]?.status) {
			check.status = followup_list[followup_list?.length - 1].status;
			temp1 = followup_list[followup_list?.length - 1].followup_by;
			await check.save();
		}

		for (let i = 0; i < followup_list?.length; i++) {
			const item = followup_list[i];
			let { date, followup_by, status, comment, completed_comment, completed } = item;
			let validation = await validationCheck({ date, followup_by, status });
			if (!validation.status) {
				throw new ErrorResponse(`Please provide a ${validation?.errorAt} in followup_list ${i}`, 400);
			}
		}
		if (followup_list?.length && followup_list[followup_list?.length - 1]["addedTime"] == undefined)
			followup_list[followup_list?.length - 1]["addedTime"] = new Date().toISOString();
		let schemaData = { followup_type, connection_id, created_by, followup_list };
		let checkFollowupID = await Followup.findOne({ connection_id });
		if (checkFollowupID) {
			checkFollowupID["followup_list"] = followup_list;
			await checkFollowupID.save();
			return res.status(200).json({ success: true, data: checkFollowupID });
		}
		const data = await Followup.create(schemaData);
		if (temp1) {
			temp1 = await Staff.findById(temp1).select("email");
			let temp2 = await leadAndEnquiry.findById(connection_id).select("name mobile email");
			await AssignToEmailNotefication({
				name: temp2?.name,
				mobile: temp2?.mobile,
				email: temp1?.email,
				type: ` an ${followup_type} followup`,
				message: "You have been assigned a new lead/enquiry. Please check your dashboard for more details."
			});
		}
		return res.status(201).json({ success: true, data });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
});

//Delete Followup By (Lead,Enquiry)
exports.DeleteSingleFollowup = asyncHandler(async (req, res) => {
	try {
		const { connection_id } = req.params;
		if (!connection_id) throw new ErrorResponse(`Please provide a followup connection_id `, 400);

		const data = await Followup.findOneAndDelete({ connection_id });
		if (!data) throw new ErrorResponse(`followup connection_id not found`, 400);

		return res.status(200).json({ success: true, data: "Followup Deleted Successful" });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
});