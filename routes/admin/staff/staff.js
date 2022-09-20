const express = require("express");
const router = express.Router();

const { GetAllStaff } = require("../../../controllers/staff");

router.route('/').get(GetAllStaff)

module.exports = router;