//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData, validationImportent } = require('../../middleware/validationCheck');

//models
const LeadAndEnquiry = require("../../models/leadAndEnquiry");
const Followup = require("../../models/followup");
const Emi = require('../../models/emi');
const ObjectId = require('mongoose').Types.ObjectId;

const { PermissionAuthenctication } = require('../../middleware/apiAuth');
// Get LeadAndEnquiry by filter
exports.GetLeadAndEnquiryByFilter = asyncHandler(async (req, res) => {
    let str1 = (req.query.type == "lead") ? "leads_filter" : "enquiry_filter";
    let permission = await PermissionAuthenctication(req.headers, str1);
    if (!permission.success) {
        throw new ErrorResponse(`You are not authorized to access this route`, 401);
    }
    try {
        const { populate, type } = req.query;
        let temp = [], Arr = [];
        for (let key in req.query) {
            if (key == "populate" || key == "created_by" || key == "type")
                continue;
            if (key === "courses") {
                (req.query[key].split(',')).map(val => {
                    Arr.push({ courses: { $in: val } })
                });
            } else {
                temp.push({ [key]: req.query[key] });
            }
        }
        if (type) {
            if (type == "lead") {
                temp.push({ isLead: true });
            } else if (type == "enquiry") {
                temp.push({ isEnquiry: true });
            }
        }
        if (Arr.length == 0) Arr.push({});
        let data = await LeadAndEnquiry.find({ $and: [...temp, { $or: Arr }] })
            .populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});
//Get All LeadAndEnquiry
exports.GetAllLeadAndEnquiry = asyncHandler(async (req, res) => {
    let { populate, type, assign_to, created_by } = req.query;
    let str1 = (type == "lead") ? "all_lead" : "all_enquiry";
    let permission = await PermissionAuthenctication(req.headers, str1);
    if (!permission.success) {
        throw new ErrorResponse(`You are not authorized to access this route`, 401);
    }
    try {
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
            .populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Create Single LeadAndEnquiry
exports.CreateLeadAndEnquiry = asyncHandler(async (req, res) => {
    try {
        const { name, gender, mobile, email, date, assign_to, comment, next_followup_date, type, batch,
            alternate_number, status, source, courses, center, medium, city, currentStatus } = req.body;
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
            currentStatus, name, gender, mobile, email, date, assign_to, comment,
            alternate_number, status, source, courses, center, medium, city, type, batch
        };
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
        console.log(schemaData);
        Object.keys(schemaData).map((key) => (!schemaData[key]) ? delete schemaData[key] : "");
        const data = await LeadAndEnquiry.create(schemaData);
        console.log(data._id);
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Get Single LeadAndEnquiry
exports.GetSingleLeadAndEnquiry = asyncHandler(async (req, res) => {
    let { populate } = req.query;
    console.log("enquiry_id..........");
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a LeadAndEnquiry id `, 400);

        let data = await LeadAndEnquiry.findOne({ _id: id }).populate(populate?.split(",").map((item) => ({ path: item })));;
        if (!data) throw new ErrorResponse(`LeadAndEnquiry id not found`, 400);
        if (data.isEnquiry) {
            let result = await Emi.findOne({ enquiry_id: id });
            console.log("result aa gaya", result);
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
        console.log("this...", oldLeadAndEnquiry);
        if (!oldLeadAndEnquiry) throw new ErrorResponse(`Lead not found`, 400);
        if (oldLeadAndEnquiry.currentStatus != "lead" && oldLeadAndEnquiry.isLead == false) 
            throw new ErrorResponse(`This lead is already moved into Enquiry stage.`, 400);

        const data = await LeadAndEnquiry.findOneAndUpdate({ _id: id }, 
            { isEnquiry: true, currentStatus: "enquiry", isLead : false }, { returnOriginal: false });
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});



//Update Single Lead
exports.UpdateLead = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Lead id `, 400);

        let oldLeadAndEnquiry = await findUniqueData(LeadAndEnquiry, { _id: id });
        if (!oldLeadAndEnquiry) throw new ErrorResponse(`Lead not found`, 400);
        if (oldLeadAndEnquiry.currentStatus != "lead") throw new ErrorResponse(`You cannot update this lead.`, 400);

        const { name, gender, mobile, email, date, assign_to, comment, alternate_number,
            status, source, courses, center, medium, city } = req.body;
        //validate email
        if (oldLeadAndEnquiry.email != email) {
            let checkEmail = await findUniqueData(LeadAndEnquiry, { email });
            if (checkEmail) throw new ErrorResponse(`email already exist`, 400);
        }

        //main and final body
        let schemaData = { name, gender, mobile, email, date, assign_to, comment, alternate_number, status, source, courses, center, medium, city };

        const data = await LeadAndEnquiry.findOneAndUpdate({ _id: id }, schemaData, { returnOriginal: false });
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//Update Single Enquiry
exports.UpdateEnquiry = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Enquiry id `, 400);

        let oldLeadAndEnquiry = await findUniqueData(LeadAndEnquiry, { _id: id });
        if (!oldLeadAndEnquiry)
            throw new ErrorResponse(`Enquiry not found`, 400);
        if (oldLeadAndEnquiry.currentStatus != "enquiry")
            throw new ErrorResponse(`You cannot update this Enquiry.`, 400);

        const { name, gender, mobile, email, date, assign_to, comment,
            alternate_number, status, source, courses, center, medium, city, isEnquiry, type, batch } = req.body;
        let { gross_amount, committed_amount, bifurcation, fees } = req.body;
        console.log(gross_amount, committed_amount, bifurcation, fees);
        //validate email
        if (email && oldLeadAndEnquiry.email != email) {
            // let checkEmail = await findUniqueData(LeadAndEnquiry, { $or: [{ "enquiry_data.email": email, "isEnquiry": true }, { email, "isEnquiry": true }] });
            // if (checkEmail) throw new ErrorResponse(`email already exist`, 400);
            let checkEmail = await findUniqueData(LeadAndEnquiry, { email });
            if (checkEmail) throw new ErrorResponse(`email already exist`, 400);
        }

        //main and final body
        let schemaData = {
            gross_amount, committed_amount, bifurcation, name, gender, mobile, email, isEnquiry, type, batch,
            date, assign_to, comment, alternate_number, status, source, courses, center, medium, city, fees
        };
        let updateData = {};
        Object.entries(schemaData).map((item) => {
            if (item[1] == undefined)
                return ;   
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

