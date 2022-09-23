//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const Lead = require("../../models/lead/lead");
const Followup = require("../../models/followup");

//Get All Lead
exports.GetAllLead = asyncHandler(async (req, res) => {
    let { populate,assign_to } = req.query;

    try {
        let filter = {};
        if (assign_to) {
            filter["assign_to"] = String(assign_to);
        } 

        const data = await Lead.find({ ...filter }).populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Create Single Lead
exports.CreateLead = asyncHandler(async (req, res) => {
    try {
        const { name, gender, mobile, email, lead_date, assign_to, comment, alternate_number, status, source, courses,center,medium,city } = req.body;

        let validation = await validationCheck({ name, email, lead_date, assign_to, status, source,center });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        }
        let schemaData = { name, gender, mobile, email, lead_date, assign_to, comment, alternate_number, status, source, courses,center,medium,city };

        let checkEmail = await findUniqueData(Lead, { email });
        if (checkEmail) throw new ErrorResponse(`email already exist`, 400);

        const data = await Lead.create(schemaData);
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Get Single Lead
exports.GetSingleLead = asyncHandler(async (req, res) => {
    let { populate } = req.query;

    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Lead id `, 400);

        const data = await Lead.findOne({ _id: id }).populate(populate?.split(",").map((item) => ({ path: item })));;
        if (!data) throw new ErrorResponse(`Lead id not found`, 400);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Delete Single Lead
exports.DeleteLead = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Lead id `, 400);

        //remove Lead from subject
        let oldLead = await Lead.findOne({ _id: id });
        if (!oldLead) throw new ErrorResponse(`Lead id not found`, 400);

        await Followup.findOneAndDelete({ connection_id: id });
        await oldLead.remove();
        return res.status(200).json({ success: true, data: "Lead Deleted Successful" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//Update Single Lead
exports.UpdateLead = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Lead _id `, 400);

        const { name, gender, mobile, email, lead_date, assign_to, comment, alternate_number, status, source, courses,center,medium,city } = req.body;
        let schemaData = { name, gender, mobile, email, lead_date, assign_to, comment, alternate_number, status, source, courses,center,medium,city };
       
        let oldLead = await findUniqueData(Lead, { _id: id });
        if (oldLead.email != email) {
            let checkEmail = await findUniqueData(Lead, { email });
            if (checkEmail) throw new ErrorResponse(`email already exist`, 400);
        }

        const data = await Lead.findOneAndUpdate({ _id: id }, schemaData, { returnOriginal: false });
        if (!data) throw new ErrorResponse(`Lead id not found`, 400);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});
