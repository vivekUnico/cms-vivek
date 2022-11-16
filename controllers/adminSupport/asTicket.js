//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');

//models
const Ticket = require("../../models/adminSupport/asTicket");
let modelName = Ticket;

exports.CreateTicket = asyncHandler(async (req, res) => {
    const { summary, reason, assignedTo, priority, status, description } = req.body;
    const schemaData = { summary, reason, assignedTo, priority, status, description };
    let validation = validationCheck(schemaData);
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }

    try {
        const data = await modelName.create(schemaData);
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.ReadTicket = asyncHandler(async (req, res) => {
    const { priority, status, createdon, select, populate, page, limit } = req.query;
    const filter = createFilter([
        { name: 'priority', value: priority, type: 'array' },
        { name: 'status', value: status, type: 'text' },
    ])
    try {
        const data = await modelName.find(filter).select(select?.split(",")).limit(Number(limit)).skip(Number(page) * Number(limit)).sort({ createdAt: -1 }).populate(populate?.split(","));
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.ReadSingleTicket = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { select, populate, } = req.query;
    try {
        const data = await modelName.findOne({ _id: id }).select(select?.split(",")).populate(populate?.split(","));
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.UpdateTicket = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { summary, reason, assignedTo, priority, status, description } = req.body;
    const schemaData = { summary, reason, assignedTo, priority, status, description };
    // let validation = validationCheck(schemaData);
    // if (!validation.status) {
    //     throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    // }

    try {
        const data = await modelName.findOneAndUpdate({ _id: id }, { summary, reason, assignedTo, priority, status, description }, { returnOriginal: false });
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.DeleteTicket = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await modelName.deleteOne({ _id: id });
        return res.status(201).json({ success: true, data: `Deleted Successfully` });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

