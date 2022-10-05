const express = require("express");
const router = express.Router();

const {
    requestBook,
    cancelRequestBook
} = require("../../controllers/librarybook/bookRequestIssued");


router.route('/request').post(requestBook);
router.route('/request-cancel').post(cancelRequestBook);


module.exports = router;