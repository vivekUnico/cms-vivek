//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');

//models
const asInfastructure = require("../../models/adminSupport/asInfastructure");
let modelName = asInfastructure;

exports.CreateInfastructure = asyncHandler(async (req, res) => {
    const { assetName, center, assignedTo, assignedOn, liabilities, tc, files } = req.body;
    const schemaData = { assetName, center, assignedTo, assignedOn, liabilities, tc, files };
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

exports.ReadInfastructure = asyncHandler(async (req, res) => {
    const { select, populate, page, limit } = req.query;
    const filter = createFilter([
        // add content for filter
    ])
    try {
        const data = await modelName.find(filter).select(select?.split(",")).limit(Number(limit)).skip(Number(page) * Number(limit)).sort({ createdAt: -1 }).populate(populate?.split(","));;
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.ReadSingleInfastructure = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { select, populate } = req.query;

    try {
        const data = await modelName.findOne({ _id: id }).select(select?.split(",")).populate(populate?.split(","));;;
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.UpdateInfastructure = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { assetName, center, assignedTo, assignedOn, liabilities, tc, files } = req.body;
    const schemaData = { assetName, center, assignedTo, assignedOn, liabilities, tc, files };
    // let validation = validationCheck(schemaData);
    // if (!validation.status) {
    //     throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    // }

    try {
        const data = await modelName.findOneAndUpdate({ _id: id }, { assetName, center, assignedTo, assignedOn, liabilities, tc, files }, { returnOriginal: false });
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.DeleteInfastructure = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await modelName.deleteOne({ _id: id });
        return res.status(201).json({ success: true, data: `Deleted Successfully` });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

