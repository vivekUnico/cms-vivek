//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData, validationImportent } = require('../../middleware/validationCheck');

//models
const LeadAndEnquiry = require("../../models/leadAndEnquiry");
const Followup = require("../../models/followup");
const Emi = require('../../models/emi');
const ObjectId = require('mongoose').Types.ObjectId;
const { EmailNoteficationForLeadAndEnquiry, AssignToEmailNotefication } = require('../../middleware/EmailNotefication');
const { parseISO, sub, add } = require('date-fns');

const { PermissionAuthenctication } = require('../../middleware/apiAuth');
// Get LeadAndEnquiry by filter
exports.GetLeadAndEnquiryByFilter = asyncHandler(async (req, res) => {
  try {
    let str1 = (req.query.type == "lead") ? "leads_filter" : "enquiry_filter";
    let permission = await PermissionAuthenctication(req.headers, str1);
    if (!permission.success) {
      throw new ErrorResponse(`You are not authorized to access this route`, 401);
    }
    const { populate, type } = req.query;
    let temp = [], Arr = [];
    for (let key in req.query) {
      if (key == "populate" || key == "created_by" || key == "type" || key == "pageno" || key == "limit")
        continue;
      if (key === "courses") {
        (req.query[key].split(',')).map(val => {
          Arr.push({ courses: { $in: val } })
        });
      } else {
        if (key == "name" || key == "mobile" || key == "last_followup.comment") {
          temp.push({ [key]: { $regex: req.query[key] } });
        } else if (key.includes("addedTime")) {
          let date = parseISO(req.query[key]);
          let date2 = add(date, { days: 1 });
          temp.push({ "last_followup.addedTime": { $gte: date, $lt: date2 } });
        } else if (key == "followup_list_length") {
          temp.push({ [key]: Number(req.query[key]) });
        }
        else temp.push({ [key]: req.query[key] });
      }
    }
    if (type) {
      if (type == "lead") {
        temp.push({ isLead: true });
      } else if (type == "enquiry") {
        temp.push({ isEnquiry: true });
      }
    }
    let curr = new Date();
    curr.setHours(0, 0, 0, 0);
    curr = sub(curr, { days: "1" });
    if (Arr.length == 0) Arr.push({});
    let data = await LeadAndEnquiry.aggregate([
      {
        $lookup: {
          from: "staffs",
          localField: "assign_to",
          foreignField: "_id",
          as: "assign_to"
        }
      },
      { $unwind: { path: "$assign_to", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "centers",
          localField: "center",
          foreignField: "_id",
          as: "center"
        }
      },
      { $unwind: { path: "$center", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "courses"
        }
      },
      {
        $lookup: {
          from: "followups",
          localField: "_id",
          foreignField: "connection_id",
          as: "followup"
        }
      },
      { $unwind: { path: "$followup", preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          "followup_list_length": {
            $size: {
              $ifNull: ["$followup.followup_list", []]
            }
          },
          "last_followup": { $last: "$followup.followup_list" },
        }
      },
      { $match: { $and: [...temp, { $or: Arr }] } },
      {
        $group: {
          _id: null,
          allData: { $push: "$$ROOT" },
          total_count: { $sum: 1 },
          match_count: { $sum: { $cond: [{ $gte: ["$updatedAt", curr] }, 1, 0] } }
        }
      },
      { $unwind: { path: "$allData", preserveNullAndEmptyArrays: true } },
      { $sort: { "allData.createdAt": -1 } },
      { $skip: (parseInt(req.query.pageno) - 1) * parseInt(req.query.limit) },
      { $limit: parseInt(req.query.limit) },
      { $replaceRoot: { newRoot: { $mergeObjects : [ "$allData", { total_count : "$total_count", match_count : "$match_count"  } ] }} },
    ]);
    console.log(data);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    throw new ErrorResponse(`Server error :${error}`, 400);
  }
});

exports.getCountTotalLeadAndEnquiry = asyncHandler(async (req, res) => {
  try {
    let { type, lasDays, created_by } = req.query, curr = new Date();
    curr.setHours(0, 0, 0, 0);
    curr = sub(curr, { days: lasDays });
    let query = { isLead: (type == "lead") };
    if (created_by) {
      query.created_by = ObjectId(created_by);
    }
    let data = await LeadAndEnquiry.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          total_count: { $sum: 1 },
          match_count: { $sum: { $cond: [{ $gte: ["$updatedAt", curr] }, 1, 0] } }
        }
      }
    ]);
    console.log(data, curr);
    return res.status(200).json({ success: true, data: data[0] });
  } catch (error) {
    throw new ErrorResponse(`Server error :${error}`, 400);
  }
});

exports.GetAllLeadAndEnquiry = asyncHandler(async (req, res) => {
  let { populate, type, assign_to, created_by } = req.query;
  try {
    let str1 = (type == "lead") ? "all_lead" : "all_enquiry";
    let permission = await PermissionAuthenctication(req.headers, str1);
    if (!permission.success) {
      throw new ErrorResponse(`You are not authorized to access this route`, 401);
    }
    let filter = [], Arr = [];
    if (type) {
      if (type == "lead") {
        filter.push({ isLead: true });
      } else if (type == "enquiry") {
        filter.push({ isEnquiry: true });
      }
    }
    if (assign_to) {
      Arr.push({ assign_to: ObjectId(assign_to) });
    }
    if (created_by) {
      Arr.push({ created_by: ObjectId(created_by) });
    }
    if (Arr.length == 0) Arr.push({});
    let data = await LeadAndEnquiry.find({ $and: [...filter, { $or: Arr }] })
      .populate(populate?.split(",").map((item) => ({ path: item })))
      .sort({ "createdAt": -1 }).skip((parseInt(req.query.pageno) - 1) * parseInt(req.query.limit)).limit(parseInt(req.query.limit))
    return res.status(200).json({ success: true, data });
  } catch (error) {
    throw new ErrorResponse(`Server error :${error}`, 400);
  }
});

//Create Single LeadAndEnquiry
exports.CreateLeadAndEnquiry = asyncHandler(async (req, res) => {
  try {
    const { name, gender, mobile, email, date, assign_to, comment, next_followup_date, type, batch, telegram, created_by,
      alternate_number, status, source, courses, center, medium, city, currentStatus, sendMail } = req.body;
    console.log(`new ${currentStatus}`, assign_to);
    let temp1 = courses?.map((item) => item?.name).join(", "), temp2 = assign_to.email;
    let validation = validationImportent({ currentStatus, name, email, date, assign_to, status, source, center });
    if (!validation.status) {
      throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    if (currentStatus == "lead" && currentStatus != "enquiry" || currentStatus == "enquiry" && currentStatus != "lead") { }
    else {
      throw new ErrorResponse(`Please provide valid currentStatus`, 400);
    }
    if (email) {
      let checkEmail = await findUniqueData(LeadAndEnquiry, { email });
      if (checkEmail)
        throw new ErrorResponse(`email already exist`, 400);
    }
    //main and final body
    let schemaData = {
      currentStatus, name, gender, mobile, email, date, assign_to, comment, created_by,
      alternate_number, status, source, courses, center, medium, city, type, batch, telegram
    }, Arr = ["", null, undefined, [], {}];
    if (currentStatus == "lead") {
      let leadSchema = { isLead: true };
      schemaData = { ...schemaData, ...leadSchema };
    } else if (currentStatus == "enquiry") {
      let { gross_amount, committed_amount, bifurcation } = req.body;
      let enquirySchema = {
        isEnquiry: true,
        enquiry_data: {
          courses,
          gross_amount, committed_amount, bifurcation
        }
      };
      schemaData = { ...schemaData, ...enquirySchema };
    }
    validation = validationImportent({ ...schemaData });
    if (!validation.status) {
      throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    };
    Object.keys(schemaData).forEach((key) => (Arr.includes(schemaData[key])) && delete schemaData[key]);
    const data = await LeadAndEnquiry.create(schemaData);
    if (sendMail && email) {
      await EmailNoteficationForLeadAndEnquiry({
        name, email, mobile, type: currentStatus, courses: temp1,
        message: "Thank you for showing interest in our courses. We will get back to you shortly."
      })
    }
    if (temp2) {
      await AssignToEmailNotefication({
        name, email: temp2, mobile, type: currentStatus,
        message: "You have been assigned a new lead/enquiry. Please check your dashboard for more details."
      });
    }
    return res.status(201).json({ success: true, data });
  } catch (error) {
    throw new ErrorResponse(`Server error :${error}`, 400);
  }
});

//Get Single LeadAndEnquiry
exports.GetSingleLeadAndEnquiry = asyncHandler(async (req, res) => {
  let { populate } = req.query;
  try {
    const { id } = req.params;
    if (!id) throw new ErrorResponse(`Please provide a LeadAndEnquiry id `, 400);

    let data = await LeadAndEnquiry.findOne({ _id: id })
      .populate(populate?.split(",").map((item) => ({ path: item })));
    let str1 = (data.isLead) ? "view_lead" : "view_enquiry";
    let permission = await PermissionAuthenctication(req.headers, str1);
    if (!permission.success) {
      throw new ErrorResponse(`You are not authorized to access this route`, 401);
    }
    if (!data) throw new ErrorResponse(`LeadAndEnquiry id not found`, 400);
    if (data.isEnquiry) {
      let result = await Emi.findOne({ enquiry_id: id });
      if (result) {
        data = { ...data._doc, Emi_Id: { ...result._doc } };
      }
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    throw new ErrorResponse(`Server error :${error}`, 400);
  }
});

//Delete Single LeadAndEnquiry
exports.DeleteLeadAndEnquiry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new ErrorResponse(`Please provide a LeadAndEnquiry id `, 400);

    //remove LeadAndEnquiry from subject
    let oldLeadAndEnquiry = await LeadAndEnquiry.findOne({ _id: id });
    if (!oldLeadAndEnquiry) throw new ErrorResponse(`LeadAndEnquiry id not found`, 400);
    let str1 = (oldLeadAndEnquiry.isLead) ? "delete_lead" : "delete_enquiry";
    let permission = await PermissionAuthenctication(req.headers, str1);
    if (!permission.success) {
      throw new ErrorResponse(`You are not authorized to access this route`, 401);
    }
    await Followup.findOneAndDelete({ connection_id: id });
    await oldLeadAndEnquiry.remove();
    return res.status(200).json({ success: true, data: "LeadAndEnquiry Deleted Successful" });
  } catch (error) {
    throw new ErrorResponse(`Server error :${error}`, 400);
  }
});

//move lead to enquiry
exports.MoveLeadToEnquiry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new ErrorResponse(`Please provide a Lead id `, 400);
    let oldLeadAndEnquiry = await findUniqueData(LeadAndEnquiry, { _id: id });
    if (!oldLeadAndEnquiry) throw new ErrorResponse(`Lead not found`, 400);
    if (oldLeadAndEnquiry.currentStatus != "lead" && oldLeadAndEnquiry.isLead == false)
      throw new ErrorResponse(`This lead is already moved into Enquiry stage.`, 400);

    // const data = await LeadAndEnquiry.findOneAndUpdate({ _id: id }, 
    //     { isEnquiry: true, currentStatus: "enquiry", isLead: false }, { returnOriginal: false });
    const data = await LeadAndEnquiry.findByIdAndUpdate(id, {
      $set: { isEnquiry: true, currentStatus: "enquiry", isLead: false }
    }, { new: true });
    await Followup.deleteMany({ connection_id: id });
    return res.status(201).json({ success: true, data });
  } catch (error) {
    throw new ErrorResponse(`Server error :${error}`, 400);
  }
});



//Update Single Lead
exports.UpdateLead = asyncHandler(async (req, res) => {
  try {
    let permission = await PermissionAuthenctication(req.headers, "edit_lead");
    if (!permission.success) {
      throw new ErrorResponse(`You are not authorized to access this route`, 401);
    }
    const { id } = req.params;
    if (!id) throw new ErrorResponse(`Please provide a Lead id `, 400);

    let oldLeadAndEnquiry = await findUniqueData(LeadAndEnquiry, { _id: id });
    if (!oldLeadAndEnquiry) throw new ErrorResponse(`Lead not found`, 400);
    if (oldLeadAndEnquiry.currentStatus != "lead") throw new ErrorResponse(`You cannot update this lead.`, 400);

    const { name, gender, mobile, email, date, assign_to, comment, alternate_number,
      status, source, courses, center, medium, city, batch, type, telegram } = req.body;
    if (oldLeadAndEnquiry.email != email) {
      let checkEmail = await findUniqueData(LeadAndEnquiry, { email });
      if (checkEmail) throw new ErrorResponse(`email already exist`, 400);
    }

    //main and final body
    let schemaData = {
      name, gender, mobile, email, date, assign_to, comment, alternate_number,
      status, source, courses, center, medium, city, batch, type, telegram
    };

    const data = await LeadAndEnquiry.findOneAndUpdate({ _id: id }, schemaData, { returnOriginal: false });
    return res.status(201).json({ success: true, data });
  } catch (error) {
    throw new ErrorResponse(`Server error :${error}`, 400);
  }
});


//Update Single Enquiry
exports.UpdateEnquiry = asyncHandler(async (req, res) => {
  try {
    let permission = await PermissionAuthenctication(req.headers, "edit_enquiry");
    if (!permission.success) {
      throw new ErrorResponse(`You are not authorized to access this route`, 401);
    }
    const { id } = req.params;
    if (!id) throw new ErrorResponse(`Please provide a Enquiry id `, 400);

    let oldLeadAndEnquiry = await findUniqueData(LeadAndEnquiry, { _id: id });
    if (!oldLeadAndEnquiry)
      throw new ErrorResponse(`Enquiry not found`, 400);
    if (oldLeadAndEnquiry.currentStatus != "enquiry")
      throw new ErrorResponse(`You cannot update this Enquiry.`, 400);

    const { name, gender, mobile, email, date, assign_to, comment, telegram,
      alternate_number, status, source, courses, center, medium, city, isEnquiry, type, batch } = req.body;
    let { gross_amount, committed_amount, bifurcation, fees } = req.body;
    //validate email
    if (email && oldLeadAndEnquiry.email != email) {
      // let checkEmail = await findUniqueData(LeadAndEnquiry, { $or: [{ "enquiry_data.email": email, "isEnquiry": true }, { email, "isEnquiry": true }] });
      // if (checkEmail) throw new ErrorResponse(`email already exist`, 400);
      let checkEmail = await findUniqueData(LeadAndEnquiry, { email });
      if (checkEmail) throw new ErrorResponse(`email already exist`, 400);
    }

    //main and final body
    let schemaData = {
      gross_amount, committed_amount, bifurcation, name, gender, mobile, email, isEnquiry, type, batch, telegram,
      date, assign_to, comment, alternate_number, status, source, courses, center, medium, city, fees
    };
    let updateData = {};
    Object.entries(schemaData).map((item) => {
      if (item[1] == undefined)
        return;
      updateData[`enquiry_data.${item[0]}`] = item[1];
      updateData[`${item[0]}`] = item[1];
    });
    await LeadAndEnquiry.findByIdAndUpdate(id, { $set: updateData });
    let data = await LeadAndEnquiry.findOne({ _id: id }).populate("courses center assign_to");
    return res.status(201).json({ success: true, data });
  } catch (error) {
    throw new ErrorResponse(`Server error :${error}`, 400);
  }
});

