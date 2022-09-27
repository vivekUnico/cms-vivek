const express = require("express");
const router = express.Router();

const {
    createLibraryBook, deleteLibraryBook, getLibraryBook, updateStudyMaterial
} = require("../../controllers/librarybook/librarybook");

router.route('/').get(getLibraryBook)
router.route('/').post(createLibraryBook)

router.route('/:id').put(updateStudyMaterial)
router.route('/:id').delete(deleteLibraryBook)

module.exports = router;