//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');

//models
const Staff = require("../../models/staff");

//Get All Staff
exports.GetAllStaff = asyncHandler(async (req, res) => {
    try {
        const data = await Staff.find({});
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});
