const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReplySchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: 'You have to add a message to your reply!',
            trim: true
        },
        writtenBy: {
            type: String,
            required: 'Who was this reply written by?'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdVal => dateFormat(createdVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const CommentSchema = new Schema(
    {
        writtenBy: {
            type: String,
            required: 'Who was this comment written by?'
        },
        commentBody: {
            type: String,
            required: 'You have to add text to your comment!',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdVal => dateFormat(createdVal)
        }, 
        replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model("Comment", CommentSchema);



module.exports = Comment;