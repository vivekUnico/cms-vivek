const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck } = require('../../middleware/validationCheck');
const ManualEmi = require('../../models/emi/manualEmi.js');

exports.GetManualEmi = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const data = await ManualEmi.findOne({ _id : id }).populate("Emi_Id");
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.CreateManualEmi = asyncHandler(async (req, res) => {
    try {
        console.log("craeting new manual emi", req.body);
        let result = await ManualEmi.create(req.body);
        return res.status(201).json({ success: true, data: result });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.deleteManualEmi = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const data = await ManualEmi.findByIdAndDelete({ _id : id });
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});