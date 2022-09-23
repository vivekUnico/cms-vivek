//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck } = require('../../middleware/validationCheck');

//models
const Followup = require("../../models/followup");
const Lead = require("../../models/lead/lead");

//Get All Followup
exports.GetAllFollowup = asyncHandler(async (req, res) => {
    try {
        let { populate,followup_by } = req.query;
        let filter = {};
        if(followup_by){
            filter["followup_by"] = String(followup_by);
        }

        const data = await Followup.find({...filter}).populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(200).json({ success: true, data });
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
        const { followup_type, connection_id, followup_by, followup_list, completed } = req.body;
        let validation = await validationCheck({ followup_type, connection_id, followup_by, followup_list, completed });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        } else if (!followup_list || followup_list?.length == 0) {
            throw new ErrorResponse(`Please provide followup_list`, 400);
        };
        if (followup_type == "lead") {
            let lead = await Lead.findById(connection_id);
            if (!lead) throw new ErrorResponse(`lead connection_id not found`, 400);
        }

        for (let i = 0; i < followup_list.length; i++) {
            const item = followup_list[i];
            let { next_date, status, conversation } = item;
            let validation = await validationCheck({ next_date, status, conversation });
            if (!validation.status) {
                throw new ErrorResponse(`Please provide a ${validation?.errorAt} in followup_list ${i}`, 400);
            }
        }

        let schemaData = { followup_type, connection_id, followup_by, followup_list, completed };

        let checkFollowupID = await Followup.findOne({ connection_id });
        if (checkFollowupID) {
            checkFollowupID["followup_list"] = followup_list;
            checkFollowupID["completed"] = completed;
            await checkFollowupID.save();

            return res.status(200).json({ success: true, data: checkFollowupID });
        }

        const data = await Followup.create(schemaData);
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