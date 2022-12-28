const Permission = require("../../models/Permissions.js");

const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/errorResponse');

exports.GetAllRolls = asyncHandler(async (req, res, next) => {
    try {
        const data = await Permission.find({});
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 500);
    }
});

exports.UpdateRoll = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Permission.findByIdAndUpdate(id, 
            { $set: { ...req.body }}, 
            { new: true, runValidators: true, }
        );
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 500);
    }
});