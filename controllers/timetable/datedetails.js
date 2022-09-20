//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const DateDetails = require("../../models/timetable/datedetails");


//Create Single DateDetails
exports.CreateDateDetails = asyncHandler(async (req, res) => {
    try {
        const { date, date_type, lecture_type, time_details } = req.body;
        let validation = await validationCheck({ date, date_type, lecture_type, time_details });

        if (!validation.status) throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        if (!time_details || time_details.length == 0) throw new ErrorResponse(`Please provide time_details`, 400);

        const schemaData = { date, date_type, lecture_type, time_details };
        
        const data = await DateDetails.create(schemaData);
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Get All DateDetails
exports.GetAllDateDetails = asyncHandler(async (req, res) => {
    try {
        const data = await DateDetails.find({});
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});
