//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');

const jwt = require("jsonwebtoken");
const crypto = require('crypto')
const { sendEmail } = require('../../utils/sendEmail');
const { hashPassword, comparePassword } = require('../../utils/hashing')
const { parseISO, sub, add } = require('date-fns');

//models
const Student = require("../../models/student");
const StudentScreening = require("../../models/student/studentScreening");

const LeadAndEnquiry = require("../../models/leadAndEnquiry");
const Staff = require("../../models/staff");
const ObjectId = require('mongoose').Types.ObjectId;

//Get All Student
exports.GetAllStudent = asyncHandler(async (req, res) => {
    let { populate, select } = req.query;

    try {
        let filter = {};
        for (let key in req.query) {
            if (["created_by", "assign_to", "center", "batch"].includes(key)) {
                filter[key] = ObjectId(req.query[key]);
            } else if (key == "courses") {
                filter[key] = { "$in": req.query[key].split(",") };
            } else if (key == "date") {
                filter[key] = {
                    "$gte": req.query[key],
                    "$lt": add(parseISO(req.query[key]), { days: 1 }).toISOString()
                }
            } else filter[key] = { $regex : req.query[key]};
        }
        const data = await Student.find({ ...filter })
            .select(select).populate(populate?.split(",").map((item) => ({ path: item }))).populate("Emi_Id");
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.UpdateStudent = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (req.body?.isBlock) {
            const { email } = req.body;
            await Staff.findOne({ email }).update({ $set: { isBlock: true } });
        }
        const result = await Student.findByIdAndUpdate(id, { $set: { ...req.body } }, { new: true });
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Create Single Student
exports.CreateStudent = asyncHandler(async (req, res) => {
    try {
        const { name, gender, mobile, email, date, assign_to, comment, alternate_number, batch, type, telegram,
            status, source, courses, center, medium, city, define_emi } = req.body;
        let { gross_amount, committed_amount, bifurcation, fees, Emi_Id } = req.body;

        let validation = await validationCheck({ name, mobile, date, courses });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        }
        if (email) {
            let checkEmail = await findUniqueData(Student, { email });
            if (checkEmail)
                throw new ErrorResponse(`email already exist`, 400);
        }
        //main and final body
        let schemaData = {
            name, gender, mobile, email, date, assign_to, comment, alternate_number, Emi_Id, batch, type, telegram, define_emi,
            status, source, courses, center, medium, city, payment_related: {
                gross_amount, committed_amount, bifurcation, fees
            }
        };
        console.log(schemaData);
        const hashedPassword = await hashPassword(mobile);
        schemaData.password = hashedPassword;

        const data = await Student.create(schemaData);
        await StudentScreening.create({ student: data._id, courses });
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Get Single Student
exports.GetSingleStudent = asyncHandler(async (req, res) => {
    let { populate } = req.query;

    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Student id `, 400);

        const data = await Student.findOne({ _id: id }).populate(populate?.split(",").map((item) => ({ path: item })));;
        if (!data) throw new ErrorResponse(`Student id not found`, 400);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Delete Single Student
exports.DeleteStudent = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Student id `, 400);

        //remove Student from subject
        let oldStudent = await Student.findOne({ _id: id });
        if (!oldStudent) throw new ErrorResponse(`Student id not found`, 400);

        await oldStudent.remove();
        return res.status(200).json({ success: true, data: "Student Deleted Successful" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//enquiry to student
exports.MoveEnquiryToStudent = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Enquiry id `, 400);

        const { fees } = req.body;

        let oldEnquiry = await findUniqueData(LeadAndEnquiry, { _id: id });
        if (!oldEnquiry) throw new ErrorResponse(`Enquiry not found`, 400);
        if (oldEnquiry.currentStatus != "enquiry") throw new ErrorResponse(`You cannot register student with this enquiry.`, 400);

        let newData = { ...oldEnquiry._doc, ...oldEnquiry._doc.enquiry_data };
        newData["payment_related"] = {
            ...oldEnquiry._doc.enquiry_data
        };

        if (fees) {
            let { date, category, committed, remaining, tax, payment_mode, remark, recepit, emi } = fees;
            validation = await validationCheck({ date, category, committed, remaining, payment_mode, recepit });
            if (!validation.status) throw new ErrorResponse(`Please provide a ${validation?.errorAt} in fees`, 400);

            newData["payment_related"] = {
                ...newData["payment_related"],
                fees: {
                    ...newData["payment_related"].fees,
                    date, category, committed, remaining, tax, payment_mode, remark, recepit
                }
            };
            if (emi) {
                newData["payment_related"].fees["emi"] = emi;
            }
        };


        let checkEmail = await findUniqueData(Student, { email: newData.email });
        if (checkEmail) throw new ErrorResponse(`email already exist`, 400);

        const data = await Student.create(newData);

        oldEnquiry.currentStatus = "student";
        await oldEnquiry.save();

        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//student fees status
exports.StudentFees = asyncHandler(async (req, res) => {
    try {
        let { populate } = req.query;

        let data = await Student.find({ "payment_related.fees": { $exists: true } })
            .populate(populate?.split(",").map((item) => ({ path: item })));;
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//student fees analytics
exports.StudentFeesAnalytics = asyncHandler(async (req, res) => {
    try {

        let data = await Student.find({ "payment_related.fees.emi": { $exists: true } }).populate("payment_related.fees.emi");

        let totalFees = 0;
        let pendingFees = 0;
        let RangeDateFees = 0;

        var today = new Date();
        var priorDate = new Date(new Date().setDate(today.getDate() - 30));

        for (let i = 0; i < data.length; i++) {
            const item = data[i];

            item.payment_related?.fees?.emi?.emi_list?.map((emi) => {
                totalFees += emi.amount;
                if (!emi.paid) {
                    pendingFees += emi.amount;
                }
                if (new Date(emi.date) <= today && new Date(emi.date) >= priorDate) {
                    RangeDateFees += emi.amount;
                }
            });
        }

        return res.status(200).json({
            success: true, data: {
                totalFees,
                pendingFees,
                RangeDateFees
            }
        });
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
        const userData = await Student.findOne({ email });
        if (!userData) {
            throw new ErrorResponse(`email provided doesn't exist`, 400);
        }

        const passwordOk = await comparePassword(password, userData.password);
        if (passwordOk) {
            const token = jwt.sign(
                {
                    name: userData.name,
                    email: userData.email,
                    userid: userData._id,
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
    const employeeData = await Student.findOne({ email: email });
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
        await Student.findOneAndUpdate(
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
    const employee = await Student.findOne({ "resetToken.token": token });
    if (!employee) {
        throw new ErrorResponse("Token not found", 404);
    }
    const currentDate = new Date();
    const expiryDate = new Date(employee.resetToken.expiry);
    if (currentDate > expiryDate) {
        await Student.findOneAndUpdate(
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

        const dataUpdated = await Student.findOneAndUpdate(
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

