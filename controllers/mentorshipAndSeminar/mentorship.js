const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

const { createZoomMeeting } = require('../../utils/zoom')


//models
const Mentorship = require("../../models/mentorshipseminar");

exports.createMentorShip = asyncHandler(async (req, res) => {
    const { teacher_name, meet_date_time, meet_type, type, mode, description } = req.body;
    const validation = validationCheck({
        teacher_name, meet_date_time, meet_type, type, mode, description
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        let zoom_link = undefined;
        console.log(mode)
        if (mode == 'Online') {
            let zoomconfig = { start_time: meet_date_time, hostemail: 'chandan7666h@gmail.com', topic: description, duration: 20, agenda: 'testing' }
            const zoomData = await createZoomMeeting(zoomconfig)
            zoom_link = zoomData?.start_url;
        }
        const dataCreated = await Mentorship.create({ type: "mentorship", teacher_name, meet_date_time, meet_type, type, mode, description, zoom_link });
        return res.status(201).json({ success: true, data: dataCreated });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.getMentorShip = asyncHandler(async (req, res) => {
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
        const data = await Mentorship.find({ type: 'mentorship', ...filter });
        return res.status(201).json({ success: true, data: data });

    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.updateMentorShip = asyncHandler(async (req, res) => {
    const { teacher_name, meet_date_time, meet_type, type, mode, description } = req.body;
    const { id } = req.params;
    const validation = validationCheck({
        id
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const dataUpdated = await Mentorship.findOneAndUpdate({ _id: id },
            {
                type: "mentorship", teacher_name, meet_date_time, meet_type, type, mode, description
            }, { returnOriginal: false });
        return res.status(201).json({ success: true, data: dataUpdated });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.deleteMentorShip = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validation = validationCheck({
        id
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const data = await Mentorship.deleteOne(
            { _id: id }
        );
        return res.status(201).json({ success: true, data: "Mentorship Deleted Successfully!" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.getSingleMentorShip = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validation = validationCheck({
        id
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const data = await Mentorship.findOne(
            { _id: id }
        );
        return res.status(201).json({ success: true, data: data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

