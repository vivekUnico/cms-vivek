//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const Student = require("../../models/student");
const StudentScreening = require("../../models/student/studentScreening");

const LeadAndEnquiry = require("../../models/leadAndEnquiry");

//Get All Student
exports.GetAllStudent = asyncHandler(async (req, res) => {
    let { populate, assign_to } = req.query;

    try {
        let filter = {};
        if (assign_to) {
            filter["assign_to"] = String(assign_to);
        }

        const data = await Student.find({ ...filter }).populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Create Single Student
exports.CreateStudent = asyncHandler(async (req, res) => {
    try {
        const { name, gender, mobile, email, date, assign_to, comment, alternate_number, status, source, courses, center, medium, city } = req.body;
        let { gross_amount, committed_amount, bifuraction, fees } = req.body;

        let validation = await validationCheck({ name, email, date, assign_to, status, source, center });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        }

        let checkEmail = await findUniqueData(Student, { email });
        if (checkEmail) throw new ErrorResponse(`email already exist`, 400);

        if (fees) {
            let { date, category, committed, remaining, tax, payment_mode, remark, recepit, emi } = fees;
            validation = await validationCheck({ date, category, committed, remaining, payment_mode, recepit });
            if (!validation.status) throw new ErrorResponse(`Please provide a ${validation?.errorAt} in fees`, 400);
        };

        //main and final body
        let schemaData = {
            name, gender, mobile, email, date, assign_to, comment, alternate_number, status, source, courses, center, medium, city, payment_related: {
                gross_amount, committed_amount, bifuraction,
                fees
            }
        };

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

        let data = await Student.find({ "payment_related.fees.emi": { $exists: true } }).populate(populate?.split(",").map((item) => ({ path: item })));;
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
                if(new Date(emi.date) <= today && new Date(emi.date) >= priorDate){
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

