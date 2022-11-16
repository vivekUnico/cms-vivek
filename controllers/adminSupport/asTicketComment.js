//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const TicketComment = require("../../models/adminSupport/asTicketComment");
let modelName = TicketComment;

exports.CreateComment = asyncHandler(async (req, res) => {
    const { comment, commentBy, ticketId } = req.body;
    const schemaData = { comment, commentBy, ticketId };
    let validation = validationCheck(schemaData);
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }

    try {
        const data = await modelName.create(schemaData);
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.ReadComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { populate, select } = req.query;
    try {
        const data = await modelName.find({ ticketId: id }).select(select?.split(",")).populate(populate?.split(","));;;;
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})


exports.UpdateComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { comment, commentBy,  } = req.body;
    const schemaData = { comment, commentBy, };
    // let validation = validationCheck(schemaData);
    // if (!validation.status) {
    //     throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    // }

    try {
        const data = await modelName.findOneAndUpdate({ _id: id }, { comment, commentBy,}, { returnOriginal: false });
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.DeleteComment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const data = await modelName.deleteOne({ _id: id });
        return res.status(201).json({ success: true, data: `Deleted Successfully` });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

