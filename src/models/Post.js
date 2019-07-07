const mongoose = require('../database');

const PostSchema = new mongoose.Schema(
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
    commentsCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Comment`,
      },
    ],
    hashtags: [String],
    public: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

PostSchema.pre('save', async function(next) {
  console.log('I WAS TRIGGERED!!!!!!!');
  next();
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
