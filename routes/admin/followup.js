const express = require("express");
const router = express.Router();

const { GetAllFollowup, GetSingleFollowup, CreateFollowup, DeleteSingleFollowup } = require("../../controllers/followup");

router.route('/').get(GetAllFollowup)
router.route('/').post(CreateFollowup) 

router.route('/:connection_id').get(GetSingleFollowup)
router.route('/:connection_id').delete(DeleteSingleFollowup)

module.exports = router;