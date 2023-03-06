//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');
const { parseISO, sub, add } = require('date-fns');

//models
const Ticket = require("../../models/adminSupport/asTicket");
const { query } = require('express');
let modelName = Ticket;

exports.CreateTicket = asyncHandler(async (req, res) => {
    const { summary, reason, assignedTo, priority, status, description } = req.body;
    const schemaData = { summary, reason, assignedTo, priority, status, description };
    let validation = validationCheck(schemaData);
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const data = await modelName.create({ ...req.body});
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.ReadTicket = asyncHandler(async (req, res) => {
    const { priority, status, createdon, populate } = req.query;
    const filter = {};
    for (let key in req.query) {
        if (key == "populate" || key == "limit" || key == "pageno") 
            continue;
        if (key == "createdAt") {
            filter[key] = {
                $gte: parseISO(req.query[key]),
                $lte: add(parseISO(req.query[key]), { days: 1 })
            };
        } else filter[key] = { $regex : req.query[key]};
    }
    try {
        const data = await modelName.find(filter).populate(populate?.split(",").map((item) => ({ path: item })))
            .sort({"createdAt" : -1}).skip((parseInt(req.query.pageno) - 1) * parseInt(req.query.limit)).limit(parseInt(req.query.limit));
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

