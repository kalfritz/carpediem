// message userid postid ikes count likes replies.

const mongoose = require('../database');

const CommentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `User`,
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    image: String,
    likesCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`,
      },
    ],
    repliesCount: {
      type: Number,
      default: 0,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Reply`,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
