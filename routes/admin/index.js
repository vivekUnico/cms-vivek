const express = require("express");
const router = express.Router();

//routes
const subject = require("./subject");

router.use('/subject',subject);

module.exports = router;