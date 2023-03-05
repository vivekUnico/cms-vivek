//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const Course = require("../../models/course");
const Subject = require("../../models/subject");
const Batch = require("../../models/batch");
const { findByIdAndUpdate } = require('../../models/course');


//Get All Course
exports.GetAllCourse = asyncHandler(async (req, res) => {
	let { populate, centers, name, dateFrom, dateTo, academic_year, select, year_version, course_id, subject_cnt } = req.query;
	let acArr = [], tempArr = [];
	try {
		let filter = {};
		if (centers) {
			let centersFilter = String(centers).split(",");
			filter["centers"] = centersFilter.length > 1 ? centersFilter : centers;
		} if (name) {
			filter['name'] = { '$regex': name, '$options': 'i' };
		}
		if (dateFrom && dateTo) {
			dateFrom = new Date(dateFrom)
			dateFrom = dateFrom.toISOString()

			dateTo = new Date(dateTo)
			dateTo.setDate(dateTo.getDate() + 1);
			dateTo = dateTo.toISOString()

			filter['createdAt'] = { $gte: dateFrom, $lte: dateTo };
		}
		if (subject_cnt) {
			filter['subjects'] = { $size: parseInt(subject_cnt) };
		}
		if (course_id && course_id != "undefined") {
			filter['course_id'] = { '$regex': course_id };
		}
		if (year_version) {
			tempArr = year_version?.split(",")?.map(itm => ({ year_version: itm }));
		}
		if (tempArr.length == 0) tempArr = [{}];
		const data = await Course.find({ ...filter, $or: tempArr, academic_year: academic_year || "master" })
			.select(select).populate(populate?.split(",").map((item) => ({ path: item })))
			.sort({ "createdAt": -1 }).skip((parseInt(req.query.pageno) - 1) * parseInt(req.query.limit)).limit(parseInt(req.query.limit))
		for (let index = 0; index < data.length; index++) {
			let item = data[index]._doc;
			item["batch_details"] = await Batch.find({ "courses": item._id });
		}

		return res.status(200).json({ success: true, data });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
});

//Get Single Course
exports.GetSingleCourse = asyncHandler(async (req, res) => {
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
		if (!id) throw new ErrorResponse(`Please provide a Course id `, 400);

		let data = await Course.findOne({ [mastersearch == 'true' ? 'master_id' : '_id']: id, ...filter })
			.populate(populate?.split(",").map((item) => ({ path: item })));
		if (data == null) {
			const master = await Course.findOne({ _id: id });
			data = await Course.create({
				name: master.name,
				price: master.price,
				centers: master.centers,
				subjects: master.subjects,
				description: master.description,
				course_id: master.course_id,
				master_id: master._id,
				academic_year: academic_year,
			});
		}
		return res.status(200).json({ success: true, data });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
});

//Create Single Course
exports.CreateCourse = asyncHandler(async (req, res) => {
	try {
		const { name, price, centers, subjects, description, course_id, master_id, academic_year } = req.body;
		let validation = await validationCheck({ name, price, centers, subjects, description, course_id });
		if (!validation.status) {
			throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
		} else if (centers?.length == 0) throw new ErrorResponse(`Please provide centers`, 400);
		else if (subjects?.length == 0) throw new ErrorResponse(`Please provide subjects`, 400);

		let schemaData = { name, price, centers, subjects, description, course_id, master_id, academic_year: "master" };

		let checkCourseID = await findUniqueData(Course, { course_id });
		if (checkCourseID) throw new ErrorResponse(`Course id already exist`, 400);

		const data = new Course({
			...schemaData,
			year_version: ["master"]
		});
		await data.save();
		await subjects.map(async (sub) => {
			await Subject.findByIdAndUpdate(sub, { $addToSet: { "courses": data._id } });
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

		let schemaData = { name, price, centers, subjects, description, course_id, master_id, academic_year };
		Object.keys(schemaData).map((key) => {
			if (schemaData[key] == undefined || schemaData[key].length == 0) {
				delete schemaData[key];
			}
		});
		let oldCourse = await Course.findOne({ _id: id }), addedSub = [], removedSub = [];
		if (subjects) {
			if (oldCourse.academic_year == 'master') {
				await oldCourse?.subjects?.map(async (oldS) => {
					if (!subjects?.includes(String(oldS))) {
						removedSub.push(oldS);
						await Subject.findByIdAndUpdate(oldS, { $pull: { courses: oldCourse._id } });
					};
				});
				//add course from subject
				await subjects.map(async (id) => {
					if (!oldCourse?.subjects?.includes(String(id))) {
						addedSub.push(id);
						await Subject.findByIdAndUpdate(id, { $addToSet: { courses: oldCourse._id } });
					}
				});
			} else {
				let curr = await Subject.find({ _id: { $in: subjects } })
				let prev = await Subject.find({ _id: { $in: oldCourse?.subjects || [] } });
				curr.map(async (item) => {
					if (prev.findIndex((val) => val.subject_id == item.subject_id) == -1) {
						let temp = await Subject.findOneAndUpdate({
							$and: [{ academic_year: oldCourse.academic_year },
							{ subject_id: item.subject_id }]
						}, { $addToSet: { courses: thisCourse._id } });
						if (temp == null) {
							temp = await Subject.create({
								name: item.name,
								topics: item.topics,
								description: item.description,
								subject_id: item.subject_id,
								master_id: item._id,
								academic_year: oldCourse.academic_year,
								courses: [oldCourse._id]
							});
						}
						await Course.findByIdAndUpdate(oldCourse._id, { $addToSet: { subjects: temp._id } });
						await Subject.updateMany({ $or: [{ master_id: item._id }, { _id: item._id }] },
							{ $addToSet: { year_version: [oldCourse.academic_year, ...item?.year_version] } });
					}
				});
				prev.map(async (item) => {
					if (curr.findIndex((val) => val.subject_id == item.subject_id) == -1) {
						await Course.updateOne({ _id: oldCourse._id }, {
							$pull: { subjects: item._id }
						});
						await Subject.findByIdAndUpdate(item._id, {
							$pull: { courses: oldCourse._id }
						});
					}
				});
			}
		};

		const data = await Course.findOneAndUpdate({ _id: id }, {
			$set: schemaData
		}, { new: true });

		// if master then update all academic_years under this master.
		if (oldCourse.academic_year == 'master') {
			["academic_year", "master_id", "subjects"].map(key => {
				delete schemaData[key]
			});
			addedSub = await Subject.find({ _id: { $in: addedSub } });
			removedSub = await Subject.find({ _id: { $in: removedSub } });

			await Course.updateMany({ master_id: oldCourse._id }, { $set: schemaData })
			let allCourses = await Course.find({ master_id: oldCourse._id }).populate("subjects");

			for (let i = 0; i < allCourses.length; i++) {
				let thisCourse = allCourses[i];
				let thisCourseSubjects = thisCourse.subjects || [];

				for (let j = 0; j < removedSub.length; j++) {
					let ind = thisCourseSubjects.findIndex(sub => sub.subject_id == removedSub[j].subject_id);
					if (ind > -1) {
						await Course.findByIdAndUpdate(thisCourse._id, { $pull: { subjects: thisCourseSubjects[ind]._id } });
						await Subject.findByIdAndUpdate(thisCourseSubjects[ind]._id, { $pull: { courses: thisCourse._id } });
					}
				}
				for (let j = 0; j < addedSub.length; j++) {
					let thissub = addedSub[j];
					if (thisCourseSubjects.findIndex(sub => sub.subject_id == thissub.subject_id) == -1) {
						let prev = await Subject.findOneAndUpdate({
							$and: [{ subject_id: thissub.subject_id }, {
								academic_year: thisCourse.academic_year
							}]
						}, { $addToSet: { courses: thisCourse._id } }, { new: true });
						if (prev == null) {
							prev = await Subject.create({
								name: thissub.name,
								topics: thissub.topics,
								description: thissub.description,
								subject_id: thissub.subject_id,
								master_id: thissub._id,
								academic_year: thisCourse.academic_year,
								courses: [thisCourse._id]
							});
						}
						await Course.findByIdAndUpdate(thisCourse._id, { $addToSet: { subjects: prev._id } });
						await Subject.updateMany({ $or: [{ master_id: thissub._id }, { _id: thissub._id }] },
							{ $addToSet: { year_version: [thisCourse.academic_year, ...thissub?.year_version] } });
					}
				}
			}
		}
		if (!data) throw new ErrorResponse(`Course id not found`, 400);

		return res.status(200).json({ success: true, data });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
});

//Add courses in academic year
exports.AddCoursesInAY = asyncHandler(async (req, res) => {
	try {
		const { courses, academic_year } = req.body;
		let validation = validationCheck({ courses, academic_year });
		if (!validation.status) {
			throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
		}

		let SubjectThisAy = [];
		let CourseThisAy = [];

		for (let i = 0; i < courses.length; i++) {
			let thisCourseSubject = [];

			const CourseMasterData = await Course.findByIdAndUpdate({ _id: courses[i] }, {
				$addToSet: { year_version: academic_year }
			}, { new: true });

			const NewAyCourse = new Course({
				academic_year,
				master_id: courses[i],
				name: CourseMasterData.name,
				price: CourseMasterData.price,
				centers: CourseMasterData.centers,
				subjects: thisCourseSubject,
				description: CourseMasterData.description,
				course_id: CourseMasterData.course_id,
				year_version : CourseMasterData.year_version
			})
			for (let j = 0; j < CourseMasterData?.subjects?.length; j++) {
				let item = CourseMasterData?.subjects[j];
				const SubjectMasterData = await Subject.findOne({ _id: item });
				// check condifgrtion to avoid repeat
				let searchForMaster = SubjectThisAy.find(itm => itm.master_subject_id == SubjectMasterData._id);
				let subjectForThisYear = await Subject.findOne({ $and: [{ subject_id: SubjectMasterData.subject_id }, { academic_year }] });
				if (subjectForThisYear) {
					await Subject.findByIdAndUpdate(subjectForThisYear?._id, {
						$addToSet: { courses: NewAyCourse._id }
					});
					SubjectThisAy.push({
						ay_subject_id: subjectForThisYear?._id,
						master_course_id: courses[i],
						master_subject_id: String(SubjectMasterData._id)
					});
					thisCourseSubject.push(subjectForThisYear?._id);
				} else {
					const NewAySubject = await Subject.create({
						name: SubjectMasterData.name,
						topics: SubjectMasterData.topics,
						description: SubjectMasterData.description,
						subject_id: SubjectMasterData.subject_id,
						master_id: SubjectMasterData._id,
						academic_year,
						courses: [NewAyCourse._id]
					})
					SubjectThisAy.push({
						ay_subject_id: NewAySubject._id,
						master_course_id: courses[i],
						master_subject_id: String(SubjectMasterData._id)
					});
					thisCourseSubject.push(NewAySubject._id);
				}
				await Subject.updateMany({ $or: [{ master_id: SubjectMasterData._id }, { _id: SubjectMasterData._id }] },
					{ $addToSet: { year_version: [academic_year, ...SubjectMasterData?.year_version] } });
			}
			NewAyCourse.subjects = thisCourseSubject;
			await NewAyCourse.save();
			await Course.updateMany({ master_id: courses[i] },
				{ $addToSet: { year_version: { $each : CourseMasterData.year_version } } });
			CourseThisAy.push({
				ay_course_id: NewAyCourse._id,
				master_course_id: courses[i]
			});
		}

		SubjectThisAy.map(async itm => {
			let newCourseArrOfSubject = [];
			CourseThisAy.map(item => {
				if (itm?.master_course_id == item?.master_course_id) {
					newCourseArrOfSubject.push(item?.ay_course_id)
				}
			})
			await Subject.findByIdAndUpdate(itm.ay_subject_id, { $addToSet: { courses: newCourseArrOfSubject } });
		})
		return res.status(200).json({ success: true, data: `All selected courses added in AY-${academic_year}` });

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

		await oldCourse?.subjects?.map(async (sub) => {
			await Subject.findByIdAndUpdate(sub, { $pull: { courses: oldCourse._id } });
		});

		await oldCourse.remove();
		return res.status(200).json({ success: true, data: "Course Deleted Successful" });
	} catch (error) {
		throw new ErrorResponse(`Server error :${error}`, 400);
	}
});