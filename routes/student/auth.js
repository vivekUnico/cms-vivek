const express = require("express");
const router = express.Router();

const { loginUser, forgetPassword,forgetPasswordWithToken } = require("../../controllers/student");


router.route('/login').post(loginUser);

router.route('/forget-send-email').post(forgetPassword);
router.route('/forget-verify').post(forgetPasswordWithToken)



module.exports = router;