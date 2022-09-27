//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const LibraryBook = require("../../models/librarybook");

exports.createLibraryBook = asyncHandler(async (req, res) => {
    const { name, bookid, courses, totalBooks, totalReq, totalIssued, totalReturned, addedby } = req.body;
    const validation = validationCheck({
        name, bookid, courses, totalBooks, totalReq, totalIssued, totalReturned, addedby
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const dataCreated = await LibraryBook.create({
            name, bookid, courses, totalBooks, totalReq, totalIssued, totalReturned, addedby
        });
        return res.status(201).json({ success: true, data: dataCreated });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.getLibraryBook = asyncHandler(async (req, res) => {
    const { page, limit } = req.query;
    try {
        const libData = await LibraryBook.find({}).limit(Number(limit)).skip(Number(page) * Number(limit)).sort({ createdAt: -1 });;
        return res.status(201).json({ success: true, data: libData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.deleteLibraryBook = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validation = validationCheck({
        id
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const dataDeleted = await LibraryBook.deleteOne({ _id: id });
        return res.status(201).json({ success: true, data: "Library Book deleted successfully!" });

    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.updateStudyMaterial = asyncHandler(async (req, res) => {
    const { name, bookid, courses, totalBooks, totalReq, totalIssued, totalReturned, addedby } = req.body;
    const { id } = req.params;
    const validation = validationCheck({
        id
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const dataUpdated = await LibraryBook.findOneAndUpdate({ _id: id }, {
            name, bookid, courses, totalBooks, totalReq, totalIssued, totalReturned, addedby
        }, { returnOriginal: false });
        return res.status(201).json({ success: true, data: dataUpdated });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});