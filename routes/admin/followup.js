const express = require("express");
const router = express.Router();

const { GetAllFollowup, GetSingleFollowup, GetFollowupByFilter, UpdateSingleFollowup, newDeleteSingleFollowup,
    CreateFollowup, DeleteSingleFollowup } = require("../../controllers/followup");

router.route('/').get(GetAllFollowup)
router.route('/').post(CreateFollowup).put(CreateFollowup)

router.route('/filter').get(GetFollowupByFilter)
router.route('/:connection_id/:addedTime').put(UpdateSingleFollowup).delete(newDeleteSingleFollowup)

router.route('/:connection_id').get(GetSingleFollowup)
router.route('/:connection_id').delete(DeleteSingleFollowup)

module.exports = router;