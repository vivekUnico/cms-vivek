const express = require("express");
const router = express.Router();

//routes
const librarybook = require("./librarybook");

const batch = require("./batch");
const subject = require("./subject");
const course = require("./course");

//auth
const auth = require("./auth")
router.use("/auth",auth);

//curriculum
router.use('/batch', batch);
router.use('/subject', subject);
router.use('/course', course);

router.use('/library', librarybook);



module.exports = router;