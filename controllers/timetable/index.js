//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');
//models
const Timetable = require("../../models/timetable/timetable");
const DateDetails = require("../../models/timetable/datedetails");
const moment = require('moment');


//Create Single Timetable
exports.CreateTimetable = asyncHandler(async (req, res) => {
    try {
        let { center, batch, start_date, end_date, create } = req.body;
        let validation = await validationCheck({ center, batch, start_date, end_date });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        }
        let schemaData = { center, batch, start_date, end_date };

        let validateData = await findUniqueData(Timetable, { center, batch });
        if (validateData) {
            if (moment(start_date) > moment(validateData.start_date) && moment(start_date) > moment(validateData.end_date)) {
                return res.status(200).json({ success: true, data: validateData, continue: true });
            } else {
                throw new ErrorResponse(`date has already been used, choose a different date`, 400);
            }
        }
        if (create) {
            const data = await Timetable.create(schemaData);
            return res.status(210).json({ success: true, data: data });
        };
        return res.status(200).json({ success: true, data: true });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Get All Timetable
exports.GetAllTimetable = asyncHandler(async (req, res) => {
    try {
        let { populate, datepopulate, center, batch, startDate, endDate } = req.query;
        let filter = { dateFilter: {} };

        if (center) {
            filter = { ...filter, "center": { $in: String(center).split(",") } };
        };
        if (batch) {
            filter = { ...filter, "batch": { $in: String(batch).split(",") } };
        }
        if (startDate && endDate) {
            startDate = new Date(startDate)
            startDate = startDate.toISOString()

            endDate = new Date(endDate)
            endDate.setDate(endDate.getDate() + 1);
            endDate = endDate.toISOString()

            filter = {
                ...filter, dateFilter: {
                    date: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            }
        }

        console.log(filter);

        const data = await Timetable.find(filter).populate(populate?.split(",").map((item) => ({ path: item })));

        for (let index = 0; index < data.length; index++) {
            let item = data[index]._doc;
            item["date_details"] = await DateDetails.find({ timetable: item._id, ...filter.dateFilter }).populate(datepopulate?.split(",").map((item) => ({ path: item })));
        }

        return res.status(200).json({ success: true, data });
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
        if (!data) throw new ErrorResponse(`timetable id not found`, 400);
        data._doc["date_details"] = await DateDetails.find({ timetable: id }).populate(populate?.split(",").map((item) => ({ path: item })));;

        return res.status(200).json({ success: true, data });
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
        return res.status(200).json({ success: true, data });
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

        return res.status(200).json({ success: true, data: "timetable Deleted Successful" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});
