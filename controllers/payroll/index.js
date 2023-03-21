const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse.js');
const Payroll = require('../../models/payroll/index.js');
const PaySlip = require('../../models/payroll/payslipsDetails.js');  


exports.createPayroll = asyncHandler(async (req, res, next) => {
  try {
    const { staffId } = req.body;
    let result = await Payroll.findOne({ staffId }), payrollData;
    if (result) {
      console.log("result", result);
      payrollData = await Payroll.findOneAndUpdate({ staffId }, {
        $set: {
          ...req?.body,
        },
      }, { returnOriginal: true });
    } else payrollData = await Payroll.create(req.body);
    return res.status(201).json({ success: true, data: payrollData });
  } catch (error) {
    throw new ErrorResponse(`Server error :${error}`, 500);
  }
});


exports.createPaySlip = asyncHandler(async (req, res, next) => {
  try {
    const result = await PaySlip.create(req.body);
    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    throw new ErrorResponse(`Server error :${error}`, 500);
  }
});

exports.getAllPaySlips = asyncHandler(async (req, res, next) => {
  try {
    const { staffId } = req.query;
    const result = await PaySlip.find({ staffId });
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    throw new ErrorResponse(`Server error :${error}`, 500);
  }
});

exports.getAllPayroll = asyncHandler(async (req, res, next) => {
  try {
    const { staffId } = req.query;
    const result = await Payroll.findOne({ staffId });
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    throw new ErrorResponse(`Server error :${error}`, 500);
  }
});