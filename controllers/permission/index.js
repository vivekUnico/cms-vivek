const Permission = require("../../models/Permissions.js");

const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse.js');
const { PermissionAuthenctication } = require('../../middleware/apiAuth.js');

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
        let str1 = "setting_permission";
        let permission = await PermissionAuthenctication(req.headers, str1);
        if (permission.success == false) {
            throw new ErrorResponse(`You are not authorized to access this route`, 401);
        }
        let { Arr } = req.body;
        let promises = Arr.map(async (item) => {
            await Permission.findByIdAndUpdate(item._id, { $set: { ...item } });
        });
        await Promise.all(promises);
        res.status(200).json({ success: true, data: Arr });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 500);
    }
});