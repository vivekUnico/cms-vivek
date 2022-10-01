//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const Student = require("../../models/student");
const StudentScreening = require("../../models/student/studentScreening");

//Get All StudentScreening
exports.GetAllStudentScreening = asyncHandler(async (req, res) => {
    let { populate, status } = req.query;

    try {
        let filter = {};
        if(status){
            filter = {...filter,status}
        }

        const data = await StudentScreening.find({ ...filter }).populate(populate?.split(",").map((item) => ({ path: item })));
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//Update Single StudentScreening
exports.UpdateStudentScreening = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a StudentScreening id `, 400);
        
        const { rollNo,status, materials } = req.body;
        let schemaData = { rollNo,status, materials };


        const data = await StudentScreening.findOneAndUpdate({ _id: id }, schemaData, { returnOriginal: false });
        if (!data) throw new ErrorResponse(`StudentScreening id not found`, 400);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});