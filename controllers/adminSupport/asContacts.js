//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');

//models
const Contact = require("../../models/adminSupport/asContact");
let modelName = Contact;


exports.CreateContact = asyncHandler(async (req, res) => {
    const { contactName, center, email, phone, comment } = req.body;
    const schemaData = { contactName, center, email, phone, comment };
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


exports.GetAllContacts = asyncHandler(async (req, res) => {
    console.log('contact get')
    let {select, populate, name, createdAt } = req.query;
    const filter = createFilter([
        // { name: 'first_name', value: name, type: 'text' },
    ])
    let filterDate = [];
    if (createdAt) {
        filterDate = createFilter([
            { name: 'createdAt', value: { dateFrom: `${sub(parseISO(createdAt), { days: 1 }).toISOString()}`, dateTo: `${add(parseISO(createdAt), { days: 1 }).toISOString()}` }, type: 'date' },
        ])
    }
    try {
        const data = await modelName.find({ ...filter, ...filterDate }).select(select?.split(",")).populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.ReadSingleContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { select, populate } = req.query;

    try {
        const data = await modelName.findOne({ _id: id }).select(select?.split(",")).populate(populate?.split(","));;;
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.UpdateContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await modelName.findOneAndUpdate({ _id: id }, {$set:req.body}, { returnOriginal: false });
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.DeleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await modelName.deleteOne({ _id: id });
        return res.status(201).json({ success: true, data: `Deleted Successfully` });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})
