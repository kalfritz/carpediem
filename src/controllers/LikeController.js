const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports = {
  async onAPost(req, res) {
    const { postId } = req.params;
    const { userId } = req;
    const post = await Post.findById(postId);

    if (post.likes.includes(userId)) {
      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: userId },
        $inc: { likesCount: -1 },
      });
    } else {
      await Post.findByIdAndUpdate(postId, {
        $addToSet: { likes: userId },
        $inc: { likesCount: +1 },
      });
    }
    res.json({ message: 'ok' });
  },

  async onAComment(req, res) {
    const { commentId } = req.params;
    const { userId } = req;
    const comment = await Comment.findById(commentId);

    if (comment.likes.includes(userId)) {
      await Comment.findByIdAndUpdate(commentId, {
        $pull: { likes: userId },
        $inc: { likesCount: -1 },
      });
    } else {
      await Comment.findByIdAndUpdate(commentId, {
        $addToSet: { likes: userId },
        $inc: { likesCount: +1 },
      });
    }
    res.json({ message: 'ok' });
  },
};
