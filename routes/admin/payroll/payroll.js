const express = require("express");
const router = express.Router();

const { 
  createPayroll, getAllPayroll
} = require('../../../controllers/payroll/index.js');

router.route('/create').post(createPayroll);
router.route('/get').get(getAllPayroll);

module.exports = router;