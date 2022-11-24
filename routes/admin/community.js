const express = require("express");
const router = express.Router();

const { CreateCommunity, GetCommunity,
    AddMembersCommunity, DeleteCommunity,
    UpdateCommunity } = require("../../controllers/community/community");

router.route('/').post(CreateCommunity)
router.route('/all/:id').get(GetCommunity)
router.route('/add-members').put(AddMembersCommunity)
router.route('/update').put(UpdateCommunity)
router.route('/:id').delete(DeleteCommunity)

module.exports = router;