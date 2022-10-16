//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');
const { createFilter } = require('../../utils/filter');
//models
const Staff = require("../../models/staff");

//Get All Staff
exports.GetAllStaff = asyncHandler(async (req, res) => {
    let { populate, subjects } = req.query;
    const filter = createFilter([
        { name: 'subjects', value: subjects, type: 'array' }
    ])
    try {
        const data = await Staff.find({ ...filter }).populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Create Single Staff
exports.CreateStaff = asyncHandler(async (req, res) => {
    try {
        const { initial, first_name, last_name, email, mobile, dob, center, staffCode, salary_type, loginId, role, department, position, grade, shift, qualification, manager, joining_date, job_type, gender, account_status, subjects } = req.body;

        let validation = await validationCheck({ initial, first_name, last_name, email, mobile, dob, center, staffCode, salary_type, loginId, role, department, position, grade, shift, qualification, manager, joining_date, job_type, gender, account_status, subjects });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        }
        let schemaData = { initial, first_name, last_name, email, mobile, dob, center, staffCode, salary_type, loginId, role, department, position, grade, shift, qualification, manager, joining_date, job_type, gender, account_status, subjects };

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
