//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const Course = require("../../models/course");
const Subject = require("../../models/subject");
const Batch = require("../../models/batch");


//Get All Course
exports.GetAllCourse = asyncHandler(async (req, res) => {
    try {
        let { populate } = req.query;
        const data = await Course.find({}).populate(populate?.split(",").map((item) => ({ path: item })));

        for (let index = 0; index < data.length; index++) {
            let item = data[index]._doc;
            item["batch_details"] = await Batch.find({ "courses": item._id });
        }

        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Get Single Course
exports.GetSingleCourse = asyncHandler(async (req, res) => {
    let { populate } = req.query;

    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Course id `, 400);

        const data = await Course.findOne({ _id: id }).populate(populate?.split(",").map((item) => ({ path: item })));;
        if (!data) throw new ErrorResponse(`Course id not found`, 400);

        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Create Single Course
exports.CreateCourse = asyncHandler(async (req, res) => {
    try {
        const { name,price, centers, subjects, description, course_id, master_id, academic_year } = req.body;
        let validation = await validationCheck({ name,price, centers, subjects, description, course_id });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        } else if (centers?.length == 0) throw new ErrorResponse(`Please provide centers`, 400);
        else if (subjects?.length == 0) throw new ErrorResponse(`Please provide subjects`, 400);

        let schemaData = { name,price, centers, subjects, description, course_id, master_id, academic_year };

        let checkCourseID = await findUniqueData(Course, { course_id });
        if (checkCourseID) throw new ErrorResponse(`Course id already exist`, 400);

        const data = await Course.create(schemaData);
        await subjects.map(async (sub) => {
            await Subject.findByIdAndUpdate(sub, { $push: { "courses": data._id } });
        });

        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Update Single Course
exports.UpdateCourse = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Course id `, 400);

        const { name, price, centers, subjects, description, course_id, master_id, academic_year } = req.body;
        if (centers?.length == 0) throw new ErrorResponse(`Please provide centers`, 400);
        else if (subjects?.length == 0) throw new ErrorResponse(`Please provide subjects`, 400);
        let schemaData = { name,price, centers, subjects, description, course_id, master_id, academic_year };

        //remove course from subject
        let oldCourse = await Course.findOne({ _id: id });
        await oldCourse?.subjects?.map(async (oldS) => {
            if (!subjects.includes(String(oldS))) {
                await Subject.findByIdAndUpdate(oldS,{ $pull: { courses: oldCourse._id } });
            };
        });
        //add course from subject
        await subjects.map(async (id)=>{
            await Subject.findByIdAndUpdate(id,{ $addToSet: { courses: oldCourse._id } });
        });

        const data = await Course.findOneAndUpdate({ _id: id }, schemaData, { returnOriginal: false });
        if (!data) throw new ErrorResponse(`Course id not found`, 400);

        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Delete Single Course
exports.DeleteCourse = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a Course id `, 400);

        //remove course from subject
        let oldCourse = await Course.findOne({ _id: id });
        if (!oldCourse) throw new ErrorResponse(`Course id not found`, 400);

        await oldCourse?.subjects?.map(async(sub)=>{
            await Subject.findByIdAndUpdate(sub,{ $pull: { courses: oldCourse._id } });
        });

        await oldCourse.remove();
        return res.status(201).json({ success: true, data: "Course Deleted Successful" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});