const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse.js');
const Payroll = require('../../models/payroll/index.js');


exports.createPayroll = asyncHandler(async (req, res, next) => {
  try {
    const { staffId } = req.body;
    let result = Payroll.findOne({ staffId }), payrollData;
    if (result) {
      payrollData = await Payroll.updateOne({ staffId }, {
        $set: {
          ...req?.body,
        },
      })
    } else payrollData = await Payroll.create(req.body);
    return res.status(201).json({ success: true, data: payrollData });
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