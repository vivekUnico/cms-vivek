//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const Ticket = require("../../models/adminSupport/asTicket");
const TicketResolution = require("../../models/adminSupport/asTicketResolution");
let modelName = TicketResolution;

exports.CreateResolution = asyncHandler(async (req, res) => {
    const { resolution, resolvedBy, ticketId } = req.body;
    const schemaData = { resolution, resolvedBy, ticketId };
    let validation = validationCheck(schemaData);
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }

    try {
        const data = await modelName.create(schemaData);
        await Ticket.findOneAndUpdate({ _id: ticketId, status: "resolved" })
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.ReadResolution = asyncHandler(async (req, res) => {
    const { id, } = req.params;
    const { populate, select } = req.query;
    try {
        const data = await modelName.find({ ticketId: id }).select(select?.split(",")).populate(populate?.split(","));;;;
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})


exports.UpdateResolution = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { resolution, resolvedBy, ticketId } = req.body;
    const schemaData = { resolution, resolvedBy };
    // let validation = validationCheck(schemaData);
    // if (!validation.status) {
    //     throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    // }

    try {
        const data = await modelName.findOneAndUpdate({ _id: id }, { resolution, resolvedBy }, { returnOriginal: false });
        await Ticket.findOneAndUpdate({ _id: ticketId, status: "resolved" })
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.DeleteResolution = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const data = await modelName.deleteOne({ _id: id });
        return res.status(201).json({ success: true, data: `Deleted Successfully` });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

