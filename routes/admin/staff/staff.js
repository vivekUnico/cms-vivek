const express = require("express");
const router = express.Router();

const { GetAllStaff, CreateStaff, GetSingleStaff, DeleteStaff, UpdateStaff,loginUser,forgetPassword,forgetPasswordWithToken } = require("../../../controllers/staff");
const { ApiAuthentication } = require("../../../middleware/apiAuth");

router.route('/').get(GetAllStaff)
router.route('/').post(CreateStaff)

router.route('/:id').get(GetSingleStaff);
router.route('/:id').put(UpdateStaff);
router.route('/:id').delete(DeleteStaff);


router.route('/login').post(loginUser);

router.route('/forget-send-email').post(forgetPassword);
router.route('/forget-verify').post(forgetPasswordWithToken)


module.exports = router;