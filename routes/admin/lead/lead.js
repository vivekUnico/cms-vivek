const express = require("express");
const router = express.Router();

const { GetAllLead, CreateLead, GetSingleLead, UpdateLead, DeleteLead } = require("../../../controllers/lead");

router.route('/').get(GetAllLead)
router.route('/').post(CreateLead)

router.route('/:id').get(GetSingleLead)
router.route('/:id').put(UpdateLead)
router.route('/:id').delete(DeleteLead)


module.exports = router;