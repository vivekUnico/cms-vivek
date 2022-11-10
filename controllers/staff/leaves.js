//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');

//models
const Staff = require("../../models/staff");
const Leaves = require("../../models/leaves");


//Create Leaves
exports.CreateLeaves = asyncHandler(async (req, res) => {
    try {
        const { name, type, leave_date, reason } = req.body;

        let validation = validationCheck({ name, type, leave_date, reason });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        }
        // Todo : increase total_leave for student & staff
        let schemaData = { name, type, leave_date, applied_on: new Date().toISOString(), status: "Pending", reason };

        const data = await Leaves.create(schemaData);
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Get Leaves
exports.getLeaves = asyncHandler(async (req, res) => {
    try {
        const { type, name, } = req.query;
        let filter = createFilter([
            { name: 'type', value: type, type: 'text' },
        ])
        console.log(filter)
        const data = await Leaves.find({ ...filter, name });
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//Update Leaves
exports.UpdateLeaves = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { leave_date, reason } = req.body;

        let validation = validationCheck({ leave_date, reason });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        }
        let schemaData = { leave_date, reason };

        const data = await Leaves.findOneAndUpdate({ _id: id }, schemaData, { returnOriginal: false });
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//Update Leaves Status
exports.UpdateLeavesStatus = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        let validation = validationCheck({ status });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        }
        //enum: ["Pending", "Approved", "Not-Approved", "Cancelled"]
        const data = await Leaves.findOneAndUpdate({ _id: id }, { status: status }, { returnOriginal: false });
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Delete Leave
exports.DeleteLeave = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Leaves.deleteOne({ _id: id });
        return res.status(200).json({ success: true, data: "Leave Deleted Successfully!" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});