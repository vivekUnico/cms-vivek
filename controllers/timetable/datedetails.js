//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const DateDetails = require("../../models/timetable/datedetails");
const moment = require('moment');

//Get All DateDetails
exports.GetAllDateDetails = asyncHandler(async (req, res) => {
    let { populate } = req.query;
    try {
        const { timetable } = req.params;
        if (!timetable) throw new ErrorResponse(`Please provide a timetable _id `, 400);

        const data = await DateDetails.find({ timetable }).populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(200).json({ success: true, data });
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
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Create Single DateDetails
exports.CreateDateDetails = asyncHandler(async (req, res, next) => {
    try {
        const { dates, create } = req.body;
        if (!dates || dates.length == 0) throw new ErrorResponse(`Please provide dates`, 400);

        for (let index = 0; index < dates.length; index++) {
            const item = dates[index];
            const { timetable, date, date_type, lecture_type, time_details } = item;

            let validation = await validationCheck({ timetable, date, date_type, lecture_type });
            if (!validation.status) throw new ErrorResponse(`Please provide a ${validation?.errorAt} at ${index}`);

            // let matchDate = await DateDetails.findOne({
            //     timetable, date: {
            //         $eq: date
            //     }
            // });
            // if (matchDate) throw new ErrorResponse(`${date} already exists`);


            if (date_type == "lecture") {
                if (!time_details || time_details.length == 0) throw new ErrorResponse(`Please provide time_details at ${index}`);

                for (let i = 0; i < time_details.length; i++) {
                    const time_item = time_details[i];
                    const { start_time, end_time, subject, topics, teacher } = time_item;

                    validation = await validationCheck({ start_time, end_time, subject, topics, teacher });
                    if (!validation.status) throw new ErrorResponse(`Please provide a ${validation?.errorAt} in time_details at ${i} date ${moment(date).format("DD MMM YYYY")}`);
                }
            } else {
                delete item["time_details"];
            }
            dates[index] = item;
        }

        if (create) {
            const data = await DateDetails.create([...dates]);
            return res.status(201).json({ success: true, data });
        }
        return res.status(201).json({ success: true, data: true });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//Update Single DateDetails
exports.UpdateDateDetails = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a date _id `, 400);
        const { date, date_type, lecture_type, status } = req.body;

        let schemaData = { date, date_type, lecture_type, status };
        if (schemaData.date_type && schemaData.date_type == "holiday") {
            schemaData["time_details"] = [];
        }

        const data = await DateDetails.findOneAndUpdate({ _id: id }, schemaData, { returnOriginal: false });
        if (!data) throw new ErrorResponse(`date id not found`, 400);

        return res.status(200).json({ success: true, data });
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

        return res.status(200).json({ success: true, data: "Date Deleted Successful" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});



// Add Lecture
exports.AddLecture = asyncHandler(async (req, res) => {
    try {
        const { dateid } = req.params;
        if (!dateid) throw new ErrorResponse(`Please provide a date _id `, 400);

        const { time_details } = req.body;
        if (!time_details || time_details.length == 0) throw new ErrorResponse(`Please provide time_details`, 400);

        for (let i = 0; i < time_details.length; i++) {
            const item = time_details[i];
            const { start_time, end_time, subject, topics, teacher } = item;

            let validation = await validationCheck({ start_time, end_time, subject, topics, teacher });
            if (!validation.status) throw new ErrorResponse(`Please provide a ${validation?.errorAt} in time_details at ${i}`, 400);
        }

        const data = await DateDetails.findOneAndUpdate({ _id: dateid }, { $push: { time_details } }, { returnOriginal: false });
        if (!data) throw new ErrorResponse(`lecture id not found`, 400);

        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

// Update Lecture
exports.UpdateLecture = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a lecture _id `, 400);

        let { start_time, end_time, subject, topics, teacher, status } = req.body;

        let oldLecture = await DateDetails.findOne({ "time_details._id": id });
        if (!oldLecture) throw new ErrorResponse(`lecture id not found`, 400);
        oldLecture = oldLecture.time_details.find((tim)=> tim._id == id);

        let oldStartTime = moment(oldLecture.start_time).hour();
        let oldEndTime = moment(oldLecture.end_time).hour();

        let latestStartTime = moment(start_time).hour();
        let latestEndTime = moment(end_time).hour();

        if (start_time && oldStartTime != latestStartTime) {
            if(start_time && latestStartTime > oldStartTime){
                status = "Postponed"
            }else if(start_time && latestStartTime < oldStartTime){
                status = "Preponed"
            }
        }
        if (end_time && oldEndTime != latestEndTime) {
            if(end_time && latestEndTime > oldEndTime){
                status = "Postponed"
            }else if(end_time && latestEndTime < oldEndTime){
                status = "Preponed"
            }
        }


        const data = await DateDetails.findOneAndUpdate({ "time_details._id": id }, {
            '$set': {
                'time_details.$.start_time': start_time,
                'time_details.$.end_time': end_time,
                'time_details.$.subject': subject,
                'time_details.$.topics': topics,
                'time_details.$.teacher': teacher,
                'time_details.$.status': status,
            }
        }, { returnOriginal: false });

        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

// Delete Lecture
exports.DeleteLecture = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a lecture _id `, 400);

        const data = await DateDetails.findOneAndUpdate({ "time_details._id": id }, { $pull: { time_details: { _id: id }, actuals_details: { timedetailId: id } } }, { returnOriginal: false });
        if (!data) throw new ErrorResponse(`lecture id not found`, 400);

        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});



// Add Actuals
exports.AddActuals = asyncHandler(async (req, res) => {
    try {
        const { dateid } = req.params;
        if (!dateid) throw new ErrorResponse(`Please provide a date _id `, 400);

        const { actuals_details } = req.body;
        if (!actuals_details || actuals_details.length == 0) throw new ErrorResponse(`Please provide actuals_details`, 400);

        for (let i = 0; i < actuals_details.length; i++) {
            const item = actuals_details[i];
            const { timedetailId, start_time, end_time, subject, topics, completed_topics, partially_completed_topics, teacher } = item;

            let validation = await validationCheck({ timedetailId, start_time, end_time, subject, topics, teacher });
            if (!validation.status) throw new ErrorResponse(`Please provide a ${validation?.errorAt} in actuals_details at ${i}`, 400);
        }

        const data = await DateDetails.findOneAndUpdate({ _id: dateid }, { actuals_details }, { returnOriginal: false });
        if (!data) throw new ErrorResponse(`date id not found`, 400);

        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});