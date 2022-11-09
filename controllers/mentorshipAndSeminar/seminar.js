const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

const { createZoomMeeting } = require('../../utils/zoom')


//models
const Seminar = require("../../models/mentorshipseminar");

exports.createSeminar = asyncHandler(async (req, res) => {
    const { teacher_name, meet_date_time, type, description } = req.body;
    const validation = validationCheck({
        teacher_name, meet_date_time, type, description
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        let zoom_link = undefined;
        // if (mode == 'online') {
        let zoomconfig = { start_time: meet_date_time, hostemail: 'chandan7666h@gmail.com', topic: description, duration: 20, agenda: 'testing' }
        const zoomData = await createZoomMeeting(zoomconfig)
        zoom_link = zoomData?.start_url;
        // }
        const dataCreated = await Seminar.create({ type: "seminar", teacher_name, meet_date_time, type, description, zoom_link });
        return res.status(201).json({ success: true, data: dataCreated });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.getSeminar = asyncHandler(async (req, res) => {
    const { teacher_name, meet_date_time, mode } = req.query;
    let filter = {};
    if (teacher_name) {
        let teacher_name = String(teacher_name);
        filter["teacher_name"] = teacher_name;
    } if (mode) {
        filter['mode'] = { '$regex': mode, '$options': 'i' };
    } if (meet_date_time) {
        dateFrom = new Date(meet_date_time)
        dateFrom = dateFrom.toISOString()
        filter['meet_date_time'] = {
            $gte: dateFrom,
            $lte: dateFrom
        };
    }
    try {
        const data = await Seminar.find({ type: 'seminar', ...filter }).populate('teacher_name');
        return res.status(201).json({ success: true, data: data });

    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.updateSeminar = asyncHandler(async (req, res) => {
    const { teacher_name, meet_date_time, meet_type, type, mode, description } = req.body;
    const { id } = req.params;
    const validation = validationCheck({
        id
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const dataUpdated = await Seminar.findOneAndUpdate({ _id: id },
            {
                type: "mentorship", teacher_name, meet_date_time, meet_type, type, mode, description
            }, { returnOriginal: false });
        return res.status(201).json({ success: true, data: dataUpdated });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.deleteSeminar = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validation = validationCheck({
        id
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const data = await Seminar.deleteOne(
            { _id: id }
        );
        return res.status(201).json({ success: true, data: "Seminar Deleted Successfully!" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.getSingleSeminar = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validation = validationCheck({
        id
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const data = await Seminar.findOne(
            { _id: id }
        );
        return res.status(201).json({ success: true, data: data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

