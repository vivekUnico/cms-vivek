//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');

//models
const Center = require("../../models/center");

//Get All Center
exports.GetAllCenter = asyncHandler(async (req, res) => {
    try {
        const data = await Center.find({});
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});
