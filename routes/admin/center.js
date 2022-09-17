const express = require("express");
const router = express.Router();

const { GetAllCenter } = require("../../controllers/center");

router.route('/').get(GetAllCenter)

module.exports = router;