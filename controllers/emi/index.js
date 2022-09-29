//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck } = require('../../middleware/validationCheck');

//models
const Emi = require("../../models/emi");

//Get All Emi
exports.GetAllEmi = asyncHandler(async (req, res) => {
    try {
        const data = await Emi.find({});
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//Get Single Emi
exports.GetSingleEmi = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Emi id `, 400);

        let oldEmi = await Emi.findById(id);
        if (!oldEmi) throw new ErrorResponse(`Emi id not found`, 400);

        return res.status(200).json({ success: true, data: oldEmi });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Create Single EMI
exports.CreateEmi = asyncHandler(async (req, res) => {
    try {
        const { applied_from, repeat, type, total_emi, total_amount, emi_list } = req.body;
        let validation = await validationCheck({ applied_from, repeat, type, total_emi, total_amount, emi_list });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        } else if (emi_list?.length == 0) throw new ErrorResponse(`Please provide a emi_list`, 400);

        await emi_list.map(async (emi, index) => {
            let { amount, date } = emi;
            validation = await validationCheck({ amount, date });
            if (!validation.status) throw new ErrorResponse(`Please provide a ${validation?.errorAt} in emi_list at ${index}`, 400);
        });

        let schemaData = { applied_from, repeat, type, total_emi, total_amount, emi_list };


        const data = await Emi.create(schemaData);
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//Update Single EMI
exports.UpdateEmi = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Emi id `, 400);

        const { applied_from, repeat, type, total_emi, total_amount } = req.body;

        let schemaData = { applied_from, repeat, type, total_emi, total_amount };

        const data = await Emi.findByIdAndUpdate(id, schemaData, { returnOriginal: false });
        if (!data) throw new ErrorResponse(`Emi id not found`, 400);

        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//add emi in emi_list
exports.AppendEMI = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Emi id `, 400);

        let { amount, date, payment_mode, paid } = req.body;
        let schemaData = { amount, date, payment_mode, paid };

        const data = await Emi.findOneAndUpdate({ "_id": id }, { $push: { "emi_list": schemaData } }, { returnOriginal: false });
        if (!data) throw new ErrorResponse(`Emi id not found`, 400);

        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//update emi in emi_list
exports.Update_emi_list = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a emi_list id `, 400);

        let { amount, date, payment_mode, paid } = req.body;
        let schemaData = { amount, date, payment_mode, paid };
        
        let updateData = {};
        Object.entries(schemaData).map((item) => {
            updateData[`emi_list.$.${item[0]}`] = item[1];
        });

        const data = await Emi.findOneAndUpdate({ "emi_list._id": id }, { $set: { ...updateData } }, { returnOriginal: false });
        if (!data) throw new ErrorResponse(`emi_list id not found`, 400);

        return res.status(201).json({ success: true, data,updateData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//remove emi in emi_list
exports.RemoveEMI = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a emi_list id `, 400);

        const data = await Emi.findOneAndUpdate({ "emi_list._id": id }, { $pull: { "emi_list": { "_id": id } } }, { new: true });
        if (!data) throw new ErrorResponse(`emi_list id not found`, 400);

        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});



//Delete Single Emi
exports.DeleteEmi = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Emi id `, 400);

        let oldEmi = await Emi.findByIdAndDelete(id);
        if (!oldEmi) throw new ErrorResponse(`Emi id not found`, 400);

        return res.status(200).json({ success: true, data: "Emi Deleted Successful" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});