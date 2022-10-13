const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');
//models
const Assignment = require('../../models/testsAssignment/assignment');

exports.createAssignment = asyncHandler(async (req, res) => {
    const { name, timetable_datedetails, lecture_subject, center, course, batch, submissionDateTime, description, topic } = req.body;
    //type : normal | mcq
    const assignmentData = {
        name, timetable_datedetails, lecture_subject, center, course, batch, submissionDateTime, description, topic
    }

    const validation = validationCheck({
        name, timetable_datedetails, lecture_subject, center, course, batch, submissionDateTime, description, topic
    });

    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }

    try {
        const AssignmentData = await Assignment.create(assignmentData);
        return res.status(201).json({ success: true, data: AssignmentData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.getAllAssignment = asyncHandler(async (req, res) => {
    // const { } = req.params;
    const { name, timetable_datedetails, lecture_subject, center, course, batch, submissionDateTime, page, limit, populate, select } = req.query;
    // console.log('api ok')
    const filter = createFilter([
        { name: 'name', value: name },
        { name: 'timetable_datedetails', value: timetable_datedetails },
        { name: 'lecture_subject', value: lecture_subject, type: 'array' },
        { name: 'center', value: center, type: 'array' },
        { name: 'course', value: course, type: 'array' },
        { name: 'batch', value: batch, type: 'array' },
        { name: 'submissionDateTime', value: submissionDateTime, type: 'date' }]);

    console.log(JSON.stringify(filter));
    try {
        const AssignmentData = await Assignment.find({ ...filter }).select(select?.split(",")).limit(Number(limit)).skip(Number(page) * Number(limit)).sort({ createdAt: -1 }).populate(populate?.split(","));
        return res.status(200).json({ success: true, data: AssignmentData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.getSingleAssignment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { populate, select } = req.query;

    if (!id) {
        throw new ErrorResponse(`Please provide id`, 400);
    }
    try {
        const AssignmentData = await Assignment.findOne({ _id: id }).select(select?.split(",")).populate(populate?.split(","));
        return res.status(200).json({ success: true, data: AssignmentData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.updateAssignment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { ame, timetable_datedetails, lecture_subject, center, lecture, course, batch, submissionDateTime, description } = req.body;
    const qp = {
        ame, timetable_datedetails, lecture_subject, center, lecture, course, batch, submissionDateTime, description
    };

    try {
        const AssignmentData = await Assignment.findOneAndUpdate({ _id: id }, { ...qp }, { returnOriginal: false });
        return res.status(201).json({ success: true, data: AssignmentData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.deleteAssignment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ErrorResponse(`Please provide id`, 400);
    }
    try {
        const AssignmentData = await Assignment.deleteOne({ _id: id });
        // Delete associated questions and answer
        return res.status(201).json({ success: true, data: "Question Paper Delete Successfully" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})