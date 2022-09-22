const express = require("express");
const router = express.Router();

const { GetAllStaff, CreateStaff, GetSingleStaff, DeleteStaff, UpdateStaff } = require("../../../controllers/staff");

router.route('/').get(GetAllStaff)
router.route('/').post(CreateStaff)

router.route('/:id').get(GetSingleStaff);
router.route('/:id').put(UpdateStaff);
router.route('/:id').delete(DeleteStaff);


module.exports = router;