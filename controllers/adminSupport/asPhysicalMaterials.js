//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');

//models
const PhysicalMaterial = require("../../models/adminSupport/asPhysicalMaterials");
let modelName = PhysicalMaterial;

exports.CreatePhysicalMaterials = asyncHandler(async (req, res) => {
    const { materialName, totalQty, totalAvailable, totalRemaining, totalUsed, center, course, purpose } = req.body;
    const schemaData = { materialName, totalQty, totalAvailable, totalRemaining, totalUsed, center, course, purpose };
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

exports.ReadPhysicalMaterials = asyncHandler(async (req, res) => {
    const { select, populate, page, limit } = req.query;
    const filter = createFilter([
        // add content for filter
    ])

    try {
        const data = await modelName.find(filter).select(select?.split(",")).limit(Number(limit)).skip(Number(page) * Number(limit)).sort({ createdAt: -1 }).populate(populate?.split(","));
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.ReadSinglePhysicalMaterials = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { select, populate } = req.query;

    try {
        const data = await modelName.findOne({ _id: id }).select(select?.split(",")).populate(populate?.split(","));;;
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.UpdatePhysicalMaterials = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { materialName, totalQty, totalAvailable, totalRemaining, totalUsed, center, course, purpose } = req.body;
    const schemaData = { materialName, totalQty, totalAvailable, totalRemaining, totalUsed, center, course, purpose };
    // let validation = validationCheck(schemaData);
    // if (!validation.status) {
    //     throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    // }

    try {
        const data = await modelName.findOneAndUpdate({ _id: id }, { materialName, totalQty, totalAvailable, totalRemaining, totalUsed, center, course, purpose }, { returnOriginal: false });
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.DeletePhysicalMaterials = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const data = await modelName.deleteOne({ _id: id });
        return res.status(201).json({ success: true, data: ` deleted Successfully` });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

