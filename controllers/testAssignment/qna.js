const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');
//models
const QuestionAnswer = require('../../models/testsAssignment/qna');

exports.createQuestionAnswer = asyncHandler(async (req, res) => {
    const { qpid, question, ans, type, mcq, questionimage, defaultans, answerimage, marks } = req.body;
    //type : normal | mcq
    const qp = {
        qpid, question, ans, type, mcq, answerimage, defaultans, marks
    };
    if (questionimage) {
        qp["questionimage"] = questionimage;
    }
    if (answerimage) {
        qp["answerimage"] = answerimage;
    }

    const validation = validationCheck({
        qpid, question, type,
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    if (type == 'mcq') {
        if (!(mcq.length > 1)) {
            throw new ErrorResponse(`Please provide mcq options`, 400);
        }
    }

    try {
        const QuestionAnswerData = await QuestionAnswer.create({ ...qp });
        return res.status(201).json({ success: true, data: QuestionAnswerData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})


exports.getAllQA = asyncHandler(async (req, res) => {
    const { qp_id } = req.params;
    const { page, limit, populate, select, course, } = req.query;
    if (!qp_id) {
        throw new ErrorResponse(`Please provide qp_id`, 400);
    }
    try {
        const QuestionAnswerData = await QuestionAnswer.find({ qpid: qp_id, ...filter }).select(select?.split(",")).limit(Number(limit)).skip(Number(page) * Number(limit)).sort({ createdAt: -1 }).populate(populate?.split(","));
        return res.status(201).json({ success: true, data: QuestionAnswerData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.getSingleQA = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { populate, select } = req.query;

    if (!id) {
        throw new ErrorResponse(`Please provide id`, 400);
    }
    try {
        const QuestionAnswerData = await QuestionAnswer.findOne({ _id: id }).select(select?.split(",")).populate(populate?.split(","));
        return res.status(201).json({ success: true, data: QuestionAnswerData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.updateQA = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { question, ans, type, mcq, questionimage, answerimage, marks } = req.body;
    const qp = {
        question, ans, type, mcq, questionimage, answerimage, marks
    };
    if (questionimage) {
        qp["questionimage"] = questionimage;
    }
    if (answerimage) {
        qp["answerimage"] = answerimage;
    }

    const validation = validationCheck({
        question, type,
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    if (!id) {
        throw new ErrorResponse(`Please provide id`, 400);
    }
    try {
        const QuestionAnswerData = await QuestionAnswer.findOneAndUpdate({ _id: id }, { ...qp }, { returnOriginal: false });
        return res.status(201).json({ success: true, data: QuestionAnswerData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.deleteQA = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ErrorResponse(`Please provide id`, 400);
    }
    try {
        const QuestionAnswerData = await QuestionAnswer.deleteOne({ _id: id });
        // Delete associated questions and answer
        return res.status(201).json({ success: true, data: "Question Paper Delete Successfully" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})