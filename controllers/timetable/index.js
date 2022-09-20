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
        const { center, batch, start_date, end_date } = req.body;
        let validation = await validationCheck({ center, batch, start_date });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        }

        let schemaData = { center, batch, start_date, end_date };

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
        const data = await Timetable.find({});

        for (let index = 0; index < data.length; index++) {
            let item = data[index]._doc;
            item["date_details"] = await DateDetails.find({ timetable: item._id }).populate(populate?.split(",").map((item) => ({ path: item })));;
        }

        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//Get Single Timetable
exports.GetSingleTimetable = asyncHandler(async (req, res) => {
    let { populate } = req.query;
    
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a timetable _id `, 400);

        let data = await Timetable.findById(id);
        data._doc["date_details"] = await DateDetails.find({ timetable: id }).populate(populate?.split(",").map((item) => ({ path: item })));;

        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});



//Update Single Timetable
exports.UpdateTimetable = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a timetable _id `, 400);

        const { center, batch, start_date, end_date } = req.body;
        let schemaData = { center, batch, start_date, end_date };

        const data = await Timetable.findOneAndUpdate({ _id: id }, schemaData, { returnOriginal: false });
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});



//Delete Single Timetable
exports.DeleteSingleTimetable = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a timetable _id `, 400);

        const data = await Timetable.findByIdAndDelete(id);
        if (!data) throw new ErrorResponse(`timetable id not found`, 400);

        return res.status(201).json({ success: true, data: "timetable Deleted Successful" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});
