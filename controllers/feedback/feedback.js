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

exports.UpdateFeedback = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Feedback id `, 400);

        const { feedback, created_by, data, feedback_type, created_by_type, submit_type } = req.body;
        const feedbackD = {
            feedback, created_by, data, feedback_type, created_by_type, submit_type
        }

        const feedbackData = await Feedback.findOneAndUpdate({ _id: id }, feedbackD, { returnOriginal: false });
        if (!feedbackData) throw new ErrorResponse(`Feedback not found`, 400);
        return res.status(201).json({ success: true, data: feedbackData });

    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});



exports.getFeedback = asyncHandler(async (req, res) => {
    try {
        const { created_by, feedback_type, date_id, populate } = req.query;
        const filter = createFilter([
            { name: 'feedback_type', value: feedback_type },
            { name: 'data.date_id', value: date_id },
        ]);

        const feedbackData = await Feedback.find({ ...filter }).populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(201).json({ success: true, data: feedbackData });

    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});