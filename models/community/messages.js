const mongoose = require('mongoose');

const { Schema } = mongoose;

const messagesScheme = new Schema(
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
        },
        communityid: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'community'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('messages', messagesScheme);