const express = require("express");
const router = express.Router();

const { CreateLeaves, DeleteLeave, UpdateLeaves, UpdateLeavesStatus, getLeaves } = require("../../controllers/staff/leaves");

router.route('/all').get(getLeaves)
router.route('/').post(CreateLeaves)

router.route('/:id').put(UpdateLeaves)
router.route('/status/:id').put(UpdateLeavesStatus)

router.route('/:id').delete(DeleteLeave)


module.exports = router;