const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck } = require('../../middleware/validationCheck');
const ManualEmi = require('../../models/emi/manualEmi.js');
const Emi = require('../../models/emi/index.js');

exports.GetManualEmi = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const data = await ManualEmi.findOne({ _id : id }).populate("Emi_Id");
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.CreateManualEmi = asyncHandler(async (req, res) => {
    try {
        let result = await ManualEmi.create(req.body);
        if (req.body.Emi_Id) {
            let DefinedEmi = await Emi.findById(req.body.Emi_Id);
            let emi_list = DefinedEmi.emi_list;
            let ind = emi_list.findIndex(emi => emi.paid == false);
            if (ind != -1) {
                emi_list[ind].paid = true;
                await Emi.findByIdAndUpdate(req.body.Emi_Id, {
                    $set: { emi_list }
                }, { new: true });
            }
        }
        return res.status(201).json({ success: true, data: result });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.UpdateManualEmi = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        await ManualEmi.updateMany({ id }, {
            $set: {
                ...req.body
            }
        });
        return res.send({ success : true });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.deleteManualEmi = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const data = await ManualEmi.findByIdAndDelete({ _id : id });
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});