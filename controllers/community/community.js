//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');

//models
const Community = require("../../models/community/community");
let modelName = Community;

exports.CreateCommunity = asyncHandler(async (req, res) => {
    const { name, createdby, created_by_type } = req.body;
    const schemaData = { name, createdby };
    let validation = validationCheck(schemaData);
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }

    try {
        const data = await modelName.create(schemaData);
        const updatedData = await modelName.findOneAndUpdate({ _id: data._id },
            {
                $push: { members: { member: createdby, created_by_type, admin: true } },
            },
            { new: true, useFindAndModify: false, returnOriginal: false });
        return res.status(201).json({ success: true, updatedData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.GetCommunity = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const filter = createFilter([
        // add content for filter
    ])
    try {
        const data = await modelName.find({ 'members.member': id })
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})


exports.AddMembersCommunity = asyncHandler(async (req, res) => {
    const { communityid, members } = req.body;
    const schemaData = { communityid, members };
    try {
        for (let i = 0; i < members.length; i++) {
            await modelName.findOneAndUpdate({ _id: communityid }, { $push: { members: { member: members[i].id, created_by_type: members[i].created_by_type, admin: false } } }, { returnOriginal: false });
        }
        return res.status(201).json({ success: true, data: "Community updated" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})


exports.UpdateCommunity = asyncHandler(async (req, res) => {
    const { communityid, name } = req.body;
    const schemaData = { communityid, name };
    try {
        const data = await modelName.findOneAndUpdate({ _id: communityid }, { name }, { returnOriginal: false });
        return res.status(201).json({ success: true, data: data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.DeleteCommunity = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await modelName.deleteOne({ _id: id });
        return res.status(201).json({ success: true, data: `Community Deleted Successfully` });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

