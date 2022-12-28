//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');

const { parseISO, sub, add } = require('date-fns');

//models
const Staff = require("../../models/staff");

const jwt = require("jsonwebtoken");
const crypto = require('crypto')
const { sendEmail } = require('../../utils/sendEmail');
const { hashPassword, comparePassword } = require('../../utils/hashing')

//Get All Staff
exports.GetAllStaff = asyncHandler(async (req, res) => {
    let { populate, subjects, name, createdAt } = req.query;
    const filter = createFilter([
        { name: 'subjects', value: subjects, type: 'array' },
        { name: 'first_name', value: name, type: 'text' },
    ])
    let filterDate = [];
    if (createdAt) {
        filterDate = createFilter([
            { name: 'createdAt', value: { dateFrom: `${sub(parseISO(createdAt), { days: 1 }).toISOString()}`, dateTo: `${add(parseISO(createdAt), { days: 1 }).toISOString()}` }, type: 'date' },
        ])
    }
    console.log(filter, filterDate)
    try {
        const data = await Staff.find({ ...filter, ...filterDate }).populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Create Single Staff
exports.CreateStaff = asyncHandler(async (req, res) => {
    try {
        const { initial, first_name, last_name, email, mobile, dob, center, staffCode, salary_type, loginId, role, department, 
            position, grade, shift, qualification, manager, joining_date, job_type, gender, account_status, subjects, permission_id } = req.body;

        let validation = await validationCheck({ initial, first_name, last_name, email, mobile, dob, 
            center, staffCode, salary_type, loginId, role, department, position, grade, shift, qualification, 
            manager, joining_date, job_type, gender, account_status, subjects, permission_id });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        }
        let schemaData = { initial, first_name, last_name, email, mobile, dob, center, staffCode, salary_type, loginId, role, department, 
            position, grade, shift, qualification, manager, joining_date, job_type, gender, account_status, subjects, permission_id };

        const hashedPassword = await hashPassword(mobile);
        schemaData.password = hashedPassword;

        let checkEmail = await findUniqueData(Staff, { email });
        if (checkEmail) throw new ErrorResponse(`email already exist`, 400);

        let checkStaffCode = await findUniqueData(Staff, { staffCode });
        if (checkStaffCode) throw new ErrorResponse(`staffCode already exist`, 400);

        let checkLoginId = await findUniqueData(Staff, { loginId });
        if (checkLoginId) throw new ErrorResponse(`loginId already exist`, 400);


        const data = await Staff.create(schemaData);
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

        const { initial, first_name, last_name, email, mobile, dob, center, staffCode, salary_type, loginId, role, department, position, grade, shift, qualification, manager, joining_date, job_type, gender, account_status, subjects } = req.body;
        let schemaData = { initial, first_name, last_name, email, mobile, dob, center, staffCode, salary_type, loginId, role, department, position, grade, shift, qualification, manager, joining_date, job_type, gender, account_status, subjects };

        let oldStaff = await findUniqueData(Staff, { _id: id });

        if (oldStaff.email != email) {
            let checkEmail = await findUniqueData(Staff, { email });
            if (checkEmail) throw new ErrorResponse(`email already exist`, 400);
        } else if (oldStaff.staffCode != staffCode) {
            let checkStaffCode = await findUniqueData(Staff, { staffCode });
            if (checkStaffCode) throw new ErrorResponse(`staffCode already exist`, 400);
        } else if (oldStaff.oldStaff != checkLoginId) {
            let checkLoginId = await findUniqueData(Staff, { loginId });
            if (checkLoginId) throw new ErrorResponse(`loginId already exist`, 400);
        }

        const data = await Staff.findOneAndUpdate({ _id: id }, schemaData, { returnOriginal: false });
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
        const userData = await Staff.findOne({ email });
        if (!userData) {
            throw new ErrorResponse(`email provided doesn't exist`, 400);
        }

        console.log('is Password ok -->', password, userData.password)
        const passwordOk = await comparePassword(password, userData.password);
        console.log('is Password ok -->', passwordOk)
        if (passwordOk) {
            const token = jwt.sign(
                {
                    name: userData.name,
                    email: userData.email,
                    userid: userData._id,
                    permission_id: userData.permission_id,
                },
                process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24 * 30 // 30 days
            }); // 60*60*24*7 is 7 days, here 60 means 60 seconds
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
        // console.log(updatedPassword, dataUpdated)
        if (dataUpdated) {
            return res.status(200).json({ success: true, data: "Password updated successfully" });
        }
    } catch (error) {
        throw new ErrorResponse(error, 400);

    }
});