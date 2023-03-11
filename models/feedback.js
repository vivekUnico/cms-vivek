// const mongoose = require("mongoose");

// const feedbackScheme = new mongoose.Schema(
//     {
//         feedback: {
//             type: String,
//             trim: true,
//         },
//         created_by: {
//             type: mongoose.Schema.Types.ObjectId,
//             refPath: 'created_by_type'
//         },
//         data: {
//             type: Object,
//         },
//         feedback_type: {
//             type: String,
//             enum: ["lecture", "gamification"],
//             required: [true, "Please provide feedback_type"]
//         },
//         created_by_type: {
//             type: String,
//             enum: ["student", "staff"],
//             required: [true, "Please provide created_by_type"]
//         },
//         submit_type: {
//             type: String,
//             enum: ["online", "offline"],
//             required: [true, "Please provide submit_type"]
//         }
//     },
//     { timestamps: true }
// );
// module.exports = mongoose.model("feedback", feedbackScheme);

const mongoose = require("mongoose");

const feedbackScheme = new mongoose.Schema(
	{
		feedback: {
			type: String,
			trim: true,
		},
		created_staff: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "staff"
		},
		created_student: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "student"
		},
		created_for_staff: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "staff"
		},
		subjectTimeDetails: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "subjectTimeDetail"
		},
		score: Number,
		feedback_type: {
			type: String,
			enum: ["lecture", "gamification"],
			required: [true, "Please provide feedback_type"]
		},
		submit_type: {
			type: String,
			enum: ["online", "offline"],
			required: [true, "Please provide submit_type"]
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("feedback", feedbackScheme);