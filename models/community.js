const mongoose = require('mongoose');

const { Schema } = mongoose;

const communityScheme = new Schema(
    {
        name: {
            type: String,
            require: [true, "Please provide course name"],
            trim: true,
        },
        members: [{
            member: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: 'created_by_type'
            },
            created_by_type: {
                type: String,
                enum: ["student", "staff"],
                required: [true, "Please provide created_by_type"]
            },
            admin: {
                type: Boolean,
                default: false
            }
        }],
        messages: [
            {
                message: {
                    type: String,
                },
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    refPath: 'created_by_type'
                },
                created_by_type: {
                    type: String,
                    enum: ["student", "staff"],
                },
                type: {
                    type: String,
                    enum: ["text", "image"],
                }
            }
        ],
        createdby: {
            type: mongoose.Schema.Types.ObjectId,
            require: [true, "Please provide course price"],
            ref: 'staff'
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('community', communityScheme);