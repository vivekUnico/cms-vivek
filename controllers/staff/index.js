//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');
const ObjectId = require('mongoose').Types.ObjectId;

const { parseISO, sub, add } = require('date-fns');
const Subject = require('../../models/subject.js');

//models
const Staff = require("../../models/staff");

const jwt = require("jsonwebtoken");
const crypto = require('crypto')
const { sendEmail } = require('../../utils/sendEmail');
const { hashPassword, comparePassword } = require('../../utils/hashing');
const { PermissionAuthenctication } = require('../../middleware/apiAuth');

//Get All Staff
exports.GetAllStaff = asyncHandler(async (req, res) => {
    let { populate, subjects, name, createdAt } = req.query;
    let filter = {};
    for (let key in req.query) {
        if (key == "undefined") continue;
        if (key == "permission_id")
            filter[key] = ObjectId(req.query[key]);
        else filter[key] = { $regex: req.query[key], $options: "i" };
    }
    if (filter.permission_id == undefined) {
        filter["permission_id"] = { $ne: ObjectId("63ad8d66dfdb35306d3d37b1") }
    }
    try {
        const data = await Staff.find({ ...filter })
            .populate(populate?.split(",").map((item) => ({ path: item })))
            .sort({ createdAt: -1 }).skip((parseInt(req.query.pageno) - 1) * parseInt(req.query.limit)).limit(parseInt(req.query.limit));
            return res.status(200).json({ success: true, data });
        } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Create Single Staff
exports.CreateStaff = asyncHandler(async (req, res) => {
    try {
        let str1 = "add_staff";
        let permission = await PermissionAuthenctication(req.headers, str1);
        if (!permission.success) {
            throw new ErrorResponse(`You are not authorized to access this route`, 401);
        }
        const { initial, first_name, last_name, email, mobile, dob, center, staffCode, salary_type, loginId, role, department, password,
            position, grade, shift, qualification, manager, joining_date, job_type, gender, account_status, subjects, permission_id } = req.body;

        let validation = await validationCheck({
            first_name, email, mobile, center, staffCode, gender, permission_id, password
        });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        }
        let schemaData = {
            initial, first_name, last_name, email, mobile, dob, center, staffCode, salary_type, loginId, role, department,
            position, grade, shift, qualification, manager, joining_date, job_type, gender, account_status, subjects, permission_id
        };

        const hashedPassword = await hashPassword(password);
        schemaData.password = hashedPassword;

        let checkEmail = await findUniqueData(Staff, { email });
        if (checkEmail) throw new ErrorResponse(`email already exist`, 400);

        let checkStaffCode = await findUniqueData(Staff, { staffCode });
        if (checkStaffCode) throw new ErrorResponse(`staffCode already exist`, 400);
        const data = await Staff.create(schemaData);
        await Subject.updateMany({_id : { $in : subjects || [] }}, {
            $addToSet : { Teachers : data?._id }
        });
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Get Single Staff
exports.GetSingleStaff = asyncHandler(async (req, res) => {
    let { populate } = req.query;
    try {
        const { id } = req.params;
        let str1 = "view_staff";
        let permission = await PermissionAuthenctication(req.headers, str1);
        if (!permission.success) {
            throw new ErrorResponse(`You are not authorized to access this route`, 401);
        }
        if (!id) throw new ErrorResponse(`Please provide a Staff id `, 400);

        const data = await Staff.findOne({ _id: id }).populate(populate?.split(",").map((item) => ({ path: item })));;
        if (!data) throw new ErrorResponse(`Staff id not found`, 400);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Delete Single Staff
exports.DeleteStaff = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        let str1 = "delete_staff";
        let permission = await PermissionAuthenctication(req.headers, str1);
        if (!permission.success) {
            throw new ErrorResponse(`You are not authorized to access this route`, 401);
        }
        if (!id) throw new ErrorResponse(`Please provide a Staff id `, 400);

        //remove Staff from subject
        let oldStaff = await Staff.findOne({ _id: id });
        if (!oldStaff) throw new ErrorResponse(`Staff id not found`, 400);

        await oldStaff.remove();
        return res.status(200).json({ success: true, data: "Staff Deleted Successful" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//Update Single Staff
exports.UpdateStaff = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Staff _id `, 400);
        let str1 = "update_staff";
        let permission = await PermissionAuthenctication(req.headers, str1);
        if (!permission.success) {
            throw new ErrorResponse(`You are not authorized to access this route`, 401);
        }
        const { initial, first_name, last_name, email, mobile, dob, center, staffCode, salary_type,
            loginId, role, department, position, grade, shift, qualification, manager, joining_date,
            job_type, gender, account_status, subjects, permission_id, isBlock } = req.body;
        let schemaData = {
            initial, first_name, last_name, email, mobile, dob, center, staffCode,
            salary_type, loginId, role, department, position, grade, shift, qualification, manager,
            joining_date, job_type, gender, account_status, subjects, permission_id, isBlock
        };

        let oldStaff = await findUniqueData(Staff, { _id: id });
        let checkLoginId = await findUniqueData(Staff, { loginId });
        if (oldStaff.email != email) {
            let checkEmail = await findUniqueData(Staff, { email });
            if (checkEmail) throw new ErrorResponse(`email already exist`, 400);
        } else if (oldStaff.staffCode != staffCode) {
            let checkStaffCode = await findUniqueData(Staff, { staffCode });
            if (checkStaffCode) throw new ErrorResponse(`staffCode already exist`, 400);
        } else if (oldStaff.loginId != loginId) {
            if (checkLoginId) throw new ErrorResponse(`loginId already exist`, 400);
        }

        const data = await Staff.findOneAndUpdate({ _id: id }, { $set: { ...schemaData } }, { returnOriginal: false });
        if (!data) throw new ErrorResponse(`Staff id not found`, 400);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});



//Login
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const loginData = { email, password };
    const validation = validationCheck(loginData);
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }

    try {
        const userData = await Staff.findOne({ email }).populate('permission_id');
        if (!userData || userData.isBlock) {
            throw new ErrorResponse(`you are not authenticated`, 400);
        }

        const passwordOk = await comparePassword(password, userData.password);
        if (passwordOk) {
            const token = jwt.sign(
                {
                    name: userData.name,
                    email: userData.email,
                    userid: userData._id,
                    permission_id: userData?.permission_id?._id,
                },
                process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24 * 30  
            });
            let date = new Date();
            date.setDate(date.getDate() + 6);
            delete userData.password;
            return res.status(200).json({ success: true, msg: userData, jwt: { token, expiry: date.toISOString() } });
        } else {
            throw new ErrorResponse(`email or password incorrect`, 400);
        }
    } catch (error) {
        throw new ErrorResponse(`${error}`, 400);
    }
})

//Login
exports.verifyToken = asyncHandler(async (req, res) => {
    const { token } = req.body;
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, response) => {
            if (err) {
                throw new ErrorResponse(`Please login again`, 403);
            }
            return res.status(200).json({ success: true, data: 'User Token valid.', msg: 'OK' });
        })
    } catch (error) {
        throw new ErrorResponse(`${error}`, 400);
    }
})

/*
* Forget Password get link on email id  /api/v1/user/forgot/ - All - POST
* Anybody can use this api to get forgot password link on thier email.
*/
exports.forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const validation = validationCheck(email);
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    const employeeData = await Staff.findOne({ email: email });
    if (!employeeData) {
        throw new ErrorResponse("Email not found", 404);
    }

    const date = new Date();
    date.setDate(date.getDate() + 1);

    crypto.randomBytes(32, async (err, buffer) => {
        const token = buffer.toString("hex");
        const subject = "Forget Password";
        const body = `
      <div>
       Hey there!<br/> Did you request for a Forget password<br/> If yes, please  <a href="https://example.com/forget-password/${token}">click here for forget password</a>.<br/> If no? Please ignore this email.
       </div>
      `;
        const to = [employeeData.email];
        await sendEmail(subject, body, to);
        await Staff.findOneAndUpdate(
            { _id: employeeData._id },
            { resetToken: { token, expiry: date.toISOString() } }
        );
    });
    return res.status(200).json({ success: true, data: "Email sent successfully" });
});

/*
* Forget Password get link on email id  /api/v1/user/user/forgot-token-reset/ - All - POST
* Anybody can use this api with token to reset their password
*/
exports.forgetPasswordWithToken = asyncHandler(async (req, res) => {
    // const { token } = req.params;
    const { password, token } = req.body;
    const validation = validationCheck({ password, token });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    const employee = await Staff.findOne({ "resetToken.token": token });
    if (!employee) {
        throw new ErrorResponse("Token not found", 404);
    }
    const currentDate = new Date();
    const expiryDate = new Date(employee.resetToken.expiry);
    if (currentDate > expiryDate) {
        await Staff.findOneAndUpdate(
            { _id: employee._id },
            {
                resetToken: { token: null, expiry: null },
            }
        );
        throw new ErrorResponse("Token is expired", 400);
    }
    const specialCharacterFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (password.search(/[0-9]/) == -1) {
        throw new ErrorResponse("Password must contain atleast 6 characters", 400);
    } else if (password.search(/[a-z]/) == -1) {
        throw new ErrorResponse(
            "Password must contain one lower case character",
            400
        );
    } else if (password.search(/[A-Z]/) == -1) {
        throw new ErrorResponse(
            "Password must contain one upper case character",
            400
        );
    } else if (!specialCharacterFormat.test(password)) {
        throw new ErrorResponse("Password must contain special character", 400);
    }
    const updatedPassword = await hashPassword(password);
    try {

        const dataUpdated = await Staff.findOneAndUpdate(
            { _id: employee._id },
            {
                password: updatedPassword,
                resetToken: { token: null, expiry: null },
            }
        );
        if (dataUpdated) {
            return res.status(200).json({ success: true, data: "Password updated successfully" });
        }
    } catch (error) {
        throw new ErrorResponse(error, 400);

    }
});