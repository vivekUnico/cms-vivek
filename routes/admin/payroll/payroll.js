const express = require("express");
const router = express.Router();

const { 
  createPayroll, getAllPayroll, createPaySlip, getAllPaySlips
} = require('../../../controllers/payroll/index.js');

router.route('/create').put(createPayroll);
router.route('/get').get(getAllPayroll);
router.route('/createPaySlip').post(createPaySlip);
router.route('/getPaySlip').get(getAllPaySlips);

module.exports = router;