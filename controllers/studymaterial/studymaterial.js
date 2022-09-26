//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const StudyMaterial = require("../../models/studymaterial");

exports.createStudyMaterial = asyncHandler(async (req, res) => {
    const { title, type, description, parent, attachement, courses, centers, isFree, showOnDashboard } = req.body;
    const validation = validationCheck({
        title, type, description, parent, attachement, centers
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const dataCreated = await StudyMaterial.create({ title, type, description, courses, parent, attachement, centers });
        return res.status(201).json({ success: true, data: dataCreated });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.getStudyMaterial = asyncHandler(async (req, res) => {
    // const { id } = req.params;
    // const { fields } = req.query;
    // const validation = validationCheck({
    //     id
    // });

    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const folderDetails = await StudyMaterial.find({});
        return res.status(201).json({ success: true, data: folderDetails });

    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.deleteStudyMaterial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validation = validationCheck({
        id
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const dataDeleted = await StudyMaterial.deleteOne({ _id: id });
        return res.status(201).json({ success: true, data: "StudyMaterial deleted successfully" });

    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.updateStudyMaterial = asyncHandler(async (req, res) => {
    const { title, description, courses, isFree, showOnDashboard, centers, attachement, parent } = req.body;
    const { id } = req.params;
    const validation = validationCheck({
        id
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const dataUpdated = await StudyMaterial.findOneAndUpdate({ _id: id }, { title, description, courses, isFree, showOnDashboard, centers, attachement, parent }, { returnOriginal: false });
        return res.status(201).json({ success: true, data: dataUpdated });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});