//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const Batch = require("../../models/batch");
const Center = require("../../models/center");

//Get All Batch
exports.GetAllBatch = asyncHandler(async (req, res) => {
    try {
        let { populate } = req.query;

        const data = await Batch.find({}).populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Create Single Batch
exports.CreateBatch = asyncHandler(async (req, res) => {
    try {
        const { name, center, courses, description, batch_id, batch_date } = req.body;
        let validation = await validationCheck({ name, center, courses, description, batch_id, batch_date });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        } else if (courses?.length == 0) throw new ErrorResponse(`Please provide courses`, 400);


        let schemaData = { name, center, courses, description, batch_id, batch_date };

        let checkBatchID = await findUniqueData(Batch, { batch_id });
        if (checkBatchID) throw new ErrorResponse(`Batch id already exist`, 400);

        const data = await Batch.create(schemaData);
        return res.status(201).json({ success: true, data });

    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Update Single Batch
exports.UpdateBatch = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Batch id `, 400);

        const { name, center, courses, description, batch_id, batch_date } = req.body;
        if (courses?.length == 0) throw new ErrorResponse(`Please provide courses`, 400);

        let schemaData = { name, center, courses, description, batch_id, batch_date };

        const data = await Batch.findOneAndUpdate({ _id: id }, schemaData, { returnOriginal: false });
        if (!data) throw new ErrorResponse(`Batch id not found`, 400);

        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Delete Single Batch
exports.DeleteBatch = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Batch id `, 400);

        const data = await Batch.findOneAndDelete({ _id: id });
        if (!data) throw new ErrorResponse(`Batch id not found`, 400);

        return res.status(201).json({ success: true, data: "Batch Deleted Successful" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});