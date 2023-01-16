//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const Subject = require("../../models/subject");
const Course = require("../../models/course");
const { ObjectId } = require('mongoose').Types;


//Get All Subject
exports.GetAllSubject = asyncHandler(async (req, res) => {
    let { populate, courses, name, dateFrom, dateTo, academic_year, select } = req.query;
    if (academic_year == undefined || academic_year.length <= 0)
        academic_year = "master"
    try {
        let filter = {};
        if (courses?.length) {
            let courseFilter = String(courses).split(",").map((item) => ObjectId(item.trim()));
            filter["courses"] = { $in: courseFilter };
        } if (name) {
            filter['name'] = { '$regex': name, '$options': 'i' };
        }  
        if (dateFrom && dateTo) {
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
        console.log("filter", filter);
        const data = await Subject.find({ ...filter, academic_year : academic_year })
            .select(select).populate(populate?.split(",").map((item) => ({ path: item })))
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
        let data = await Subject.findOne({ [mastersearch == 'true' ? 'master_id' : '_id']: id, ...filter })
            .populate(populate?.split(",").map((item) => ({ path: item })));;
        if (data == null) {
            let master = await Subject.findById(id)
            await Subject.create({
                name: master.name,
                topics: master.topics,
                description: master.description,
                subject_id: master.subject_id,
                master_id: master._id,
                academic_year: academic_year,
                courses: master.courses
            });
            data = await Subject.findOne({ [mastersearch == 'true' ? 'master_id' : '_id']: id, ...filter })
                .populate(populate?.split(",").map((item) => ({ path: item })));
            console.log(data);
        }
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

        const data = new Subject({
            ...schemaData,
            year_version : ["master"]
        });
        await data.save();
        return res.status(201).json({ success: true, data });

    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

//Update Single Subject
exports.UpdateSubject = asyncHandler(async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.params;
        if (!id) throw new ErrorResponse(`Please provide a subject id `, 400);
        const { name, topics, description, subject_id, master_id, academic_year } = req.body;

        let schemaData = { name, topics, description, subject_id, master_id, academic_year };
        Object.keys(schemaData).map((key) => {
            if (schemaData[key] == undefined || schemaData[key].length <= 0) {
                delete schemaData[key];
            }
        });
        let oldSubject = await findUniqueData(Subject, { _id: id });

        if (oldSubject.subject_id != subject_id && subject_id) {
            let checkSubjectId = await findUniqueData(Subject, { subject_id });
            if (checkSubjectId) throw new ErrorResponse(`subject id already exist`, 400);
        };

        const data = await Subject.findOneAndUpdate({ _id: id }, {
            $set: schemaData
        }, { returnOriginal: false });
        // if master then update all academic_years under this master.
        if (oldSubject.academic_year == 'master') {
            await Subject.updateMany({ master_id: oldSubject._id }, { $set : schemaData})
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
