//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const DateDetails = require("../../models/timetable/datedetails");

//Get All DateDetails
exports.GetAllDateDetails = asyncHandler(async (req, res) => {
    let { populate } = req.query;
    try {
        const { timetable } = req.params;
        if (!timetable) throw new ErrorResponse(`Please provide a timetable _id `, 400);

        const data = await DateDetails.find({ timetable }).populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//Get Single DateDetails
exports.GetSingleDateDetails = asyncHandler(async (req, res) => {
    let { populate } = req.query;
    
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a date _id `, 400);

        const data = await DateDetails.findById(id).populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Create Single DateDetails
exports.CreateDateDetails = asyncHandler(async (req, res) => {
    try {
        const { dates } = req.body;
        if (!dates || dates.length == 0) throw new ErrorResponse(`Please provide dates`, 400);

        await dates.map(async (item,index) => {
            const { timetable, date, date_type, lecture_type, time_details } = item;

            let validation = await validationCheck({ timetable, date, date_type, lecture_type, time_details });
            if (!validation.status) return res.status(400).json({ success: false, message: `Please provide a ${validation?.errorAt} at ${index}` });
            if (!time_details || time_details.length == 0) return res.status(400).json({ success: false, message: `Please provide time_details at ${index}` });

            let matchDate = await DateDetails.findOne({ timetable, date: {
                $eq: date
            }});
            if(matchDate) return res.status(400).json({ success: false, message: `${date} already exists` });
        });

        const data = await DateDetails.create([...dates]);
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//Update Single DateDetails
exports.UpdateDateDetails = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a date _id `, 400);
        const { date, date_type, lecture_type, time_details } = req.body;

        if (time_details) {
            for (let i = 0; i < time_details.length; i++) {
                const item = time_details[i];
                const { start_time, end_time, subject, topics, teacher } = item;

                let validation = await validationCheck({ start_time, end_time, subject, topics, teacher });
                if (!validation.status) throw new ErrorResponse(`Please provide a ${validation?.errorAt} in time_details at ${i}`, 400);
            }
        }

        const schemaData = { date, date_type, lecture_type, time_details };
        const data = await DateDetails.findOneAndUpdate({ _id: id }, schemaData, { returnOriginal: false });
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//Delete Single DateDetails
exports.DeleteSingleDateDetails = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a date _id `, 400);

        const data = await DateDetails.findByIdAndDelete(id);
        if (!data) throw new ErrorResponse(`date id not found`, 400);

        return res.status(201).json({ success: true, data: "Date Deleted Successful" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});
