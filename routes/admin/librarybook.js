const express = require("express");
const router = express.Router();

const {
    createLibraryBook, deleteLibraryBook, getLibraryBook, updateStudyMaterial
} = require("../../controllers/librarybook/librarybook");

const {
    getLibraryBookRequested, getLibraryBookIssued,cancelRequestBook,modifyRequestBook,returnBooksIssued
} = require("../../controllers/librarybook/bookRequestIssued");

router.route('/').get(getLibraryBook)
router.route('/').post(createLibraryBook)

router.route('/:id').put(updateStudyMaterial)
router.route('/:id').delete(deleteLibraryBook)

/*
* Issued / Requested Books related Routes
*/
router.route('/request').get(getLibraryBookRequested)
router.route('/request-cancel').post(cancelRequestBook)


router.route('/issued').get(getLibraryBookIssued)

router.route('/request-modify/:id').put(modifyRequestBook)
router.route('/return/:id').put(returnBooksIssued)

module.exports = router;