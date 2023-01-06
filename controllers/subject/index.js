//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const Subject = require("../../models/subject");
const Course = require("../../models/course");


//Get All Subject
exports.GetAllSubject = asyncHandler(async (req, res) => {
    let { populate, courses, name, dateFrom, dateTo, academic_year, select } = req.query;
    let acArr = [];
    academic_year?.split(',').map(itm => acArr.push({ academic_year: itm }));
    try {
        let filter = {};
        if (courses) {
            let courseFilter = String(courses).split(",");
            filter["courses"] = courseFilter.length > 1 ? courseFilter : courses;
        } if (name) {
            filter['name'] = { '$regex': name, '$options': 'i' };
        } if (academic_year) {
            filter['$or'] = acArr;
        } if (dateFrom && dateTo) {
            dateFrom = new Date(dateFrom)
            dateFrom = dateFrom.toISOString()

            dateTo = new Date(dateTo)
            dateTo.setDate(dateTo.getDate() + 1);
            dateTo = dateTo.toISOString()

            filter['createdAt'] = {
                $gte: dateFrom,
                $lte: dateTo
            };
        }

        const data = await Subject.find({ ...filter }).select(select).populate(populate?.split(",").map((item) => ({ path: item })))
            .sort({ "createdAt" : -1 }).skip((parseInt(req.query.pageno) - 1) * parseInt(req.query.limit)).limit(parseInt(req.query.limit))
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Get Single Subject
exports.GetSingleSubject = asyncHandler(async (req, res) => {
    let { populate, academic_year, mastersearch } = req.query;
    let filter = {};

    if (academic_year) {
        filter = {
            ...filter,
            academic_year,
        };
    }

    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a subject id `, 400);
        // id is master id
        const data = await Subject.findOne({ [mastersearch == 'true' ? 'master_id' : '_id']: id, ...filter }).populate(populate?.split(",").map((item) => ({ path: item })));;
        // if (!data) throw new ErrorResponse(`Subject not found`, 400);

        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//Create Single Subject
exports.CreateSubject = asyncHandler(async (req, res) => {
    try {
        const { name, topics, description, subject_id, master_id, academic_year } = req.body;
        let validation = await validationCheck({ name, topics, description, subject_id });
        if (!validation.status) {
            throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
        } else if (topics?.length == 0) {
            throw new ErrorResponse(`Please provide Topics`, 400);
        };

        let schemaData = { name, topics, description, subject_id, master_id, academic_year };

        let checkSubjectID = await findUniqueData(Subject, { subject_id });
        if (checkSubjectID) throw new ErrorResponse(`subject id already exist`, 400);

        const data = await Subject.create(schemaData);
        return res.status(201).json({ success: true, data });

    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Update Single Subject
exports.UpdateSubject = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a subject id `, 400);
        const { name, topics, description, subject_id, master_id, academic_year } = req.body;

        if (req.body.topics?.length == 0) {
            throw new ErrorResponse(`Please provide Topics`, 400);
        };
        let schemaData = { name, topics, description, subject_id, master_id, academic_year };

        let oldSubject = await findUniqueData(Subject, { _id: id });
        if (oldSubject.subject_id != subject_id) {
            let checkSubjectId = await findUniqueData(Subject, { subject_id });
            if (checkSubjectId) throw new ErrorResponse(`subject id already exist`, 400);
        };

        const data = await Subject.findOneAndUpdate({ _id: id }, schemaData, { returnOriginal: false });
        // if master then update all academic_years under this master.
        if (oldSubject.academic_year == 'master') {
            delete schemaData.academic_year;
            delete schemaData.master_id;
            await Subject.updateMany({ master_id: oldSubject._id }, schemaData)
        }

        if (!data) throw new ErrorResponse(`Subject id not found`, 400);

        return res.status(200).json({ success: true, data });

    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


//Delete Single Subject
exports.DeleteSubject = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a subject id `, 400);

        //remove subject from course
        let oldSubject = await Subject.findOne({ _id: id });
        if (!oldSubject) throw new ErrorResponse(`Subject id not found`, 400);

        await oldSubject?.courses?.map(async (courseId) => {
            await Course.findByIdAndUpdate(courseId, { $pull: { subjects: oldSubject._id } });
        });

        await oldSubject.remove();
        return res.status(200).json({ success: true, data: "Subject Deleted Successful" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});
