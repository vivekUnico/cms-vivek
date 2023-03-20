const express = require("express");
const router = express.Router();

const { GetAllStaff, CreateStaff, GetSingleStaff, DeleteStaff, UpdateStaff,loginUser,forgetPassword, getTeachersBySubject,
  forgetPasswordWithToken ,verifyToken, getSubjectByTeacher} = require("../../../controllers/staff");
const { ApiAuthentication } = require("../../../middleware/apiAuth");

router.route('/').get(GetAllStaff)
router.route('/bysubject').get(getTeachersBySubject)
router.route('/').post(CreateStaff)
router.route('/subjects').get(getSubjectByTeacher);

router.route('/:id').get(GetSingleStaff);
router.route('/:id').put(UpdateStaff);
router.route('/:id').delete(DeleteStaff);


router.route('/login').post(loginUser);
router.route('/verify-login').post(verifyToken);

router.route('/forget-send-email').post(forgetPassword);
router.route('/forget-verify').post(forgetPasswordWithToken)


module.exports = router;