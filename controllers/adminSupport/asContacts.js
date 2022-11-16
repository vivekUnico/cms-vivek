//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');

//models
const Staff = require("../../models/staff");

exports.GetAllContacts = asyncHandler(async (req, res) => {
    let {select, populate, name, createdAt } = req.query;
    const filter = createFilter([
        { name: 'first_name', value: name, type: 'text' },
    ])
    let filterDate = [];
    if (createdAt) {
        filterDate = createFilter([
            { name: 'createdAt', value: { dateFrom: `${sub(parseISO(createdAt), { days: 1 }).toISOString()}`, dateTo: `${add(parseISO(createdAt), { days: 1 }).toISOString()}` }, type: 'date' },
        ])
    }
    try {
        const data = await Staff.find({ ...filter, ...filterDate }).select(select?.split(",")).populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});