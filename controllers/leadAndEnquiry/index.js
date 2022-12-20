//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData, validationImportent } = require('../../middleware/validationCheck');

//models
const LeadAndEnquiry = require("../../models/leadAndEnquiry");
const Followup = require("../../models/followup");

//Get All LeadAndEnquiry
exports.GetAllLeadAndEnquiry = asyncHandler(async (req, res) => {
    let { populate, type, assign_to } = req.query;

    try {
        let filter = {};
        if (type) {
            if (type == "lead") {
                filter['isLead'] = true;
            } else if (type == "enquiry") {
                filter['isEnquiry'] = true;
            }
        }
        if (assign_to) {
            filter["assign_to"] = String(assign_to);
        }


        const data = await LeadAndEnquiry.find({ ...filter }).populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Create Single LeadAndEnquiry
exports.CreateLeadAndEnquiry = asyncHandler(async (req, res) => {
    try {
        const { name, gender, mobile, email, date, assign_to, comment, next_followup_date,
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
        let schemaData = { currentStatus, name, gender, mobile, email, date, assign_to, comment, 
            alternate_number, status, source, courses, center, medium, city };
        if (currentStatus == "lead") {
            let leadSchema = { isLead: true };
            schemaData = { ...schemaData, ...leadSchema };
        } else if (currentStatus == "enquiry") {
            let { gross_amount, committed_amount, bifuraction } = req.body;
            let enquirySchema = {
                isEnquiry: true,
                enquiry_data: {
                    courses,
                    gross_amount, committed_amount, bifuraction
                }
            };
            schemaData = { ...schemaData, ...enquirySchema };
        }
        validation = validationImportent({ ...schemaData });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        };
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

    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a LeadAndEnquiry id `, 400);

        const data = await LeadAndEnquiry.findOne({ _id: id }).populate(populate?.split(",").map((item) => ({ path: item })));;
        if (!data) throw new ErrorResponse(`LeadAndEnquiry id not found`, 400);

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
        if (!oldLeadAndEnquiry) throw new ErrorResponse(`Lead not found`, 400);
        if (oldLeadAndEnquiry.currentStatus != "lead") throw new ErrorResponse(`You cannot update this lead.`, 400);

        const data = await LeadAndEnquiry.findOneAndUpdate({ _id: id }, { isEnquiry: true, currentStatus: "enquiry" }, { returnOriginal: false });
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

        const { name, gender, mobile, email, date, assign_to, comment, alternate_number, status, source, courses, center, medium, city } = req.body;

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
        if (!oldLeadAndEnquiry) throw new ErrorResponse(`Enquiry not found`, 400);
        if (oldLeadAndEnquiry.currentStatus != "enquiry") throw new ErrorResponse(`You cannot update this Enquiry.`, 400);

        const { name, gender, mobile, email, date, assign_to, comment, alternate_number, status, source, courses, center, medium, city } = req.body;
        let { gross_amount, committed_amount, bifuraction, fees } = req.body;

        //validate email
        if (email && oldLeadAndEnquiry.enquiry_data.email != email) {
            let checkEmail = await findUniqueData(LeadAndEnquiry, { $or: [{ "enquiry_data.email": email, "isEnquiry": true }, { email, "isEnquiry": true }] });
            if (checkEmail) throw new ErrorResponse(`email already exist`, 400);
        }

        //main and final body
        let schemaData = { gross_amount, committed_amount, bifuraction, name, gender, mobile, email, date, assign_to, comment, alternate_number, status, source, courses, center, medium, city, fees };
        let updateData = {};
        Object.entries(schemaData).map((item) => {
            updateData[`enquiry_data.${item[0]}`] = item[1];
        });

        const data = await LeadAndEnquiry.findOneAndUpdate({ _id: id }, { $set: updateData }, { returnOriginal: false });
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

