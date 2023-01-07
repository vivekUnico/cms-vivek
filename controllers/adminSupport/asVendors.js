//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');

//models
const Vendor = require("../../models/adminSupport/asVendors");
let modelName = Vendor;

exports.CreateVendors = asyncHandler(async (req, res) => {
    console.log('v')
    const { vendorName, kpc, email, phone, websiteURL, typeOfVendor, RegisteredOn } = req.body;
    const schemaData = { vendorName, kpc, email, phone, websiteURL, typeOfVendor, RegisteredOn };
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

exports.ReadVendors = asyncHandler(async (req, res) => {
    console.log("i am in read vendors");
    const filter = {}
    for (const key in req.query) {
        if (key !== 'limit' && key !== 'pageno') {
            filter[key] = { $regex : req.query[key]}
        }
    }
    try {
        const data = await modelName.find(filter)
        .sort({"createdAt" : -1}).skip((parseInt(req.query.pageno) - 1) * parseInt(req.query.limit)).limit(parseInt(req.query.limit));
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.ReadSingleVendors = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { select, populate } = req.query;

    try {
        const data = await modelName.findOne({ _id: id }).select(select?.split(",")).populate(populate?.split(","));;;
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.UpdateVendors = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { vendorName, kpc, email, phone, websiteURL, typeOfVendor, RegisteredOn } = req.body;
    const schemaData = { vendorName, kpc, email, phone, websiteURL, typeOfVendor, RegisteredOn };
    // let validation = validationCheck(schemaData);
    // if (!validation.status) {
    //     throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    // }

    try {
        const data = await modelName.findOneAndUpdate({ _id: id }, { vendorName, kpc, email, phone, websiteURL, typeOfVendor, RegisteredOn }, { returnOriginal: false });
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.DeleteVendors = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await modelName.deleteOne({ _id: id });
        return res.status(201).json({ success: true, data: `Deleted Successfully` });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

