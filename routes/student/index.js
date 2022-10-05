const express = require("express");
const router = express.Router();

//routes
const librarybook = require("./librarybook");

router.use('/library', librarybook);



module.exports = router;