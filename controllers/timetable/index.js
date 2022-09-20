//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const Timetable = require("../../models/timetable/timetable");
const DateDetails = require("../../models/timetable/datedetails");


//Create Single Timetable
exports.CreateTimetable = asyncHandler(async (req, res) => {
    try {
        const { center, batch, start_date, end_date, date_details } = req.body;
        let validation = await validationCheck({ center, batch, start_date, date_details });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        } else if (!date_details || date_details?.length == 0) throw new ErrorResponse(`Please provide date_details`, 400);

        let schemaData = { center, batch, start_date, end_date, date_details };

        const data = await Timetable.create(schemaData);
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//Get All Timetable
exports.GetAllTimetable = asyncHandler(async (req, res) => {
    try {
        let { populate } = req.query;

        const data = await Timetable.find({}).populate(populate?.split(",").map((item) => ({ path: item })));;
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

