//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck } = require('../../middleware/validationCheck');

//models
const Feedback = require("../../models/feedback");
const { createFilter } = require('../../utils/filter');
//Create Single Followup, Update Single Followup
exports.CreateFeedback = asyncHandler(async (req, res) => {
    try {
        const { feedback, created_by, data, feedback_type, created_by_type, submit_type } = req.body;
        const feedbackD = {
            feedback, created_by, data, feedback_type, created_by_type, submit_type
        }

        const validation = validationCheck(
            feedbackD
        );

        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        }

        const feedbackData = await Feedback.create(feedbackD);
        return res.status(201).json({ success: true, data: feedbackData });

    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.getFeedback = asyncHandler(async (req, res) => {
    try {
        const { created_by, dateid, feedback_type, } = req.query;

        const filter = createFilter([
            { name: 'created_by', value: created_by },
            { name: 'feedback_type', value: feedback_type },
            { name: 'data.dateid', value: dateid },
            { name: 'data.dateid', value: dateid },
        ]);

        const feedbackData = await Feedback.find({ ...filter });
        return res.status(201).json({ success: true, data: feedbackData });

    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});