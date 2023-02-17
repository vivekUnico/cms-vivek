//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const Batch = require("../../models/batch");
const Center = require("../../models/center");
const Course = require('../../models/course');
//Get All Batch
exports.GetAllBatch = asyncHandler(async (req, res) => {
    let { populate, center, courses, name, dateFrom, dateTo, startDate, endDate, academic_year, batch_id } = req.query;
    try {
        let filter = {};
        if (center) {
            filter["center"] = String(center);
        } if (courses) {
            let courseFilter = String(courses).split(",");
            filter["courses"] = courseFilter.length > 1 ? courseFilter : courses;
        } if (name) {
            filter['name'] = { '$regex': name, '$options': 'i' };
        } if (dateFrom && dateTo) {
            dateFrom = new Date(dateFrom)
            dateFrom = dateFrom.toISOString()

            dateTo = new Date(dateTo)
            dateTo.setDate(dateTo.getDate() + 1);
            dateTo = dateTo.toISOString()

            filter['createdAt'] = {
                $gte: dateFrom,
                $lte: dateTo
            };
        } if (startDate) {
            startDate = new Date(startDate)
            startDate = startDate.toISOString()

            filter['batch_date.start_date'] = {
                $gte: startDate
            }
        } if (endDate) {
            endDate = new Date(endDate)
            endDate.setDate(endDate.getDate() + 1);
            endDate = endDate.toISOString()

            filter['batch_date.end_date'] = {
                $lte: endDate
            };
        }
        if (academic_year) {
            filter['academic_year'] = academic_year;
        }
        if (batch_id) {
            filter['batch_id'] = { '$regex': batch_id, '$options': 'i' };
        }
        const data = await Batch.find({ ...filter }).populate(populate?.split(",").map((item) => ({ path: item })))
            .sort({ "createdAt": -1 }).skip((parseInt(req.query.pageno) - 1) * parseInt(req.query.limit)).limit(parseInt(req.query.limit))
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Get Single Batch
exports.GetSingleBatch = asyncHandler(async (req, res) => {
    const { populate } = req.query;
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Batch id `, 400);

        const data = await Batch.findById(id).populate(populate?.split(",").map((item) => ({ path: item })));
        if (!data) throw new ErrorResponse(`Batch id not found`, 400);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Create Single Batch
exports.CreateBatch = asyncHandler(async (req, res) => {
    try {
        console.log(req.body);
        const { name, center, courses, description, batch_id, batch_date, academic_year } = req.body;
        let validation = await validationCheck({ name, center, courses, description, batch_id, batch_date, academic_year });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        } else if (courses?.length == 0) throw new ErrorResponse(`Please provide courses`, 400);

        let schemaData = { name, center, courses, description, batch_id, batch_date, academic_year };

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

        const { name, center, courses, description, batch_id, batch_date, academic_year } = req.body;

        let schemaData = { name, center, courses, description, batch_id, batch_date, academic_year };

        const data = await Batch.findOneAndUpdate({ _id: id }, schemaData, { returnOriginal: false });
        if (!data) throw new ErrorResponse(`Batch id not found`, 400);

        return res.status(200).json({ success: true, data });
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

        return res.status(200).json({ success: true, data: "Batch Deleted Successful" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});