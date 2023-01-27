const SubjectTimeDetail = require('../../models/timetable/SubjectTimeDetails.js');
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { createZoomMeeting } = require('../../utils/zoom.js');
const Batch = require('../../models/batch.js');
const ObjectId = require('mongoose').Types.ObjectId;

exports.CreateSubjectTimeTable = asyncHandler(async (req, res) => {
    try {
        let { DataArr } = req.body;
        if (!DataArr?.length)
            throw new ErrorResponse(`Array can not be empty`, 400);
        for (let i = 0; i < DataArr?.length; i += 1) {
            if (DataArr[i]?.start_time == undefined || DataArr[i]?.end_time == undefined)
                throw new ErrorResponse(`data Missing in Array`, 400);
            let result = await SubjectTimeDetail.findOne({
                $or : [
                    { start_time : { $gte : DataArr[i]?.start_time, $lt : DataArr[i]?.end_time } },
                    { end_time : { $gt : DataArr[i]?.start_time, $lt :  DataArr[i]?.end_time } }
                ],
                batch : DataArr[i]?.batch
            }).select("_id");
            if (result != null)
                throw new ErrorResponse(`please correct your Time interval`, 400);
            if (DataArr[i]?.lecture_type == "online") {
                let zoomconfig = {
                    start_time : DataArr[i]?.start_time,
                    hostemail : "chandan7666h@gmail.com" || DataArr[i]?.hostEmail,
                    topic : DataArr[i]?.subjectName,
                    duration : 60 || ((new Date(DataArr[i]?.end_time) - new Date(DataArr[i]?.start_time)) / (1000 * 60)),
                    agenda: 'Online Lecture',
                }
                const zoomData = await createZoomMeeting(zoomconfig);
                DataArr[i].zoom_link = zoomData?.start_url;
            }
        }
        await SubjectTimeDetail.insertMany(DataArr || []);
        return res.status(200).json({ success: true });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 500);
    }
});

exports.GetSingleSubjectTimeTable = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        let data = await SubjectTimeDetail.findById(id).populate("center batch subject teacher");
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 500);
    }
});

exports.GetAllSubjectTimeTable = asyncHandler(async (req, res) => {
    try {
        let data = await SubjectTimeDetail.aggregate([
            { $lookup : { 
                from : "centers", 
                localField : "center", 
                foreignField : "_id", 
                as : "center" 
            } },
            { $lookup : { 
                from : "batches", 
                localField : "batch", 
                foreignField : "_id", 
                as : "batch" 
            } },
            { $lookup : { 
                from : "subjects", 
                localField : "subject", 
                foreignField : "_id", 
                as : "subject" 
            } },
            { $lookup : { 
                from : "staffs", 
                localField : "teacher", 
                foreignField : "_id", 
                as : "teacher" 
            }},
            { $unwind: { path: "$center", preserveNullAndEmptyArrays: true }},
            { $unwind: { path: "$batch", preserveNullAndEmptyArrays: true }},
            { $unwind: { path: "$subject", preserveNullAndEmptyArrays: true }},
            { $unwind: { path: "$teacher", preserveNullAndEmptyArrays: true }},
            { $sort : { start_time : 1 } },
            { $skip : (parseInt(req.query.pageno) - 1) * parseInt(req.query.limit) },
            { $limit : parseInt(req.query.limit) },
        ]);
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 500);
    }
});

exports.UpdateSubjectTimeTable = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        let data = await SubjectTimeDetail.findByIdAndUpdate(id, {
            $set : { ...req.body }
        }, { new : true });
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 500);
    }
});

exports.DeleteSubjectTimeTable = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        await SubjectTimeDetail.deleteOne({_id : id });
        return res.status(200).json({ success: true });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 500);
    }
});


exports.GetTimeTableBySubjectId = asyncHandler(async (req, res) => {
    try {
        const { subjectId } = req.params;
        let data2 = await SubjectTimeDetail.aggregate([
            { $match : { actual_subject : ObjectId(subjectId) } },
            // { $group : { _id : "$batch", samosa : { $push : "$$ROOT" } } },
            // { $group : { 
            //     _id : "$batch",
            //     "$group" : { 
            //         actual_subject : "$actual_subject",
            //         completed_topics : { $addToSet : "$completed_topics" },
            //     }
            // }, },
            { $unwind: { path: "$completed_topics", preserveNullAndEmptyArrays: false }},
            { $group : { 
                _id : "$batch",
                completed_topics : { $addToSet : "$completed_topics" },
            }, },
        ]);
        const data1 = await Batch.aggregate([
            { $lookup: {
                from : "courses",
                localField : "courses",
                foreignField : "_id",
                as : "courses"
            }},
            { $unwind: { path: "$courses", preserveNullAndEmptyArrays: true }},
            { $match: { "courses.subjects": ObjectId(subjectId) }},
        ]);
        return res.status(200).json({ success: true, data2, data1 });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 500);
    }
});
