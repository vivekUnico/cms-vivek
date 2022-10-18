const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');

//models
const QuestionPaper = require('../../models/testsAssignment/qp');

exports.createQuestionPaper = asyncHandler(async (req, res) => {
    const { name, subject, center, course, batch, testDate, testType, totalMarks, bannerInstructionFirst, bannerInstructionSecond, tbc, serialno, timeallowed, testbookletseries } = req.body;
    const qp = {
        name, subject, center, course, batch, testDate, testType, totalMarks,
    };
    const validation = validationCheck({
        name, subject, center, course, batch, testDate, testType, totalMarks,
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }

    try {
        const QuestionPaperData = await QuestionPaper.create({ ...qp, bannerInstructionFirst, bannerInstructionSecond, tbc, serialno, timeallowed, testbookletseries });
        return res.status(201).json({ success: true, data: QuestionPaperData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.getAllQP = asyncHandler(async (req, res) => {
    const { page, limit, populate, select, subject, course, center } = req.query;
    const filter = createFilter([
        { name: 'subject', value: subject },
        { name: 'course', value: course },
        { name: 'center', value: center },
    ])
    console.log(filter)
    try {
        const QuestionPaperData = await QuestionPaper.find({ ...filter }).select(select?.split(",")).limit(Number(limit)).skip(Number(page) * Number(limit)).sort({ createdAt: -1 }).populate(populate?.split(","));;
        return res.status(200).json({ success: true, data: QuestionPaperData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.getSingleQP = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { populate, select } = req.query;

    if (!id) {
        throw new ErrorResponse(`Please provide id`, 400);
    }
    try {
        const QuestionPaperData = await QuestionPaper.findOne({ _id: id }).select(select?.split(",")).populate(populate?.split(","));;;
        return res.status(201).json({ success: true, data: QuestionPaperData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.updateQP = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, subject, center, course, batch, testDate, testType, totalMarks, bannerInstructionFirst, bannerInstructionSecond, tbc, serialno, timeallowed, testbookletseries } = req.body;
    const qp = {
        name, subject, center, course, batch, testDate, testType, totalMarks, bannerInstructionFirst, bannerInstructionSecond, tbc, serialno, timeallowed, testbookletseries
    };
    // const validation = validationCheck({
    //     name, subject, bannerInstructionFirst, bannerInstructionSecond, tbc, serialno, timeallowed, marks, bannerLabel
    // });
    // if (!validation.status) {
    //     throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    // }
    if (!id) {
        throw new ErrorResponse(`Please provide id`, 400);
    }
    try {
        const QuestionPaperData = await QuestionPaper.findOneAndUpdate({ _id: id }, { ...qp }, { returnOriginal: false });
        return res.status(201).json({ success: true, data: QuestionPaperData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.deleteQP = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ErrorResponse(`Please provide id`, 400);
    }
    try {
        const QuestionPaperData = await QuestionPaper.deleteOne({ _id: id });
        // Delete associated questions and answer
        return res.status(201).json({ success: true, data: "Test Paper Deleted Successfully" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})
