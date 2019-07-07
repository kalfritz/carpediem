const Comment = require('../models/Comment');
const Post = require('../models/Post');

module.exports = {
  async getCommentsOfAPost(req, res) {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .sort('-createdAt')
      .populate(['user']);
    return res.json(comments);
  },
  async getOne(req, res) {
    const { commentId, postId } = req.params;
    const comment = await Comment.findOne({ _id: commentId });
    res.json({ comment, postId });
  },
  async index(req, res) {
    const comments = await Comment.find()
      .sort('-createdAt')
      .populate(['user']);
    return res.json(comments);
  },
  async store(req, res) {
    const { message } = req.body;
    const { userId } = req;
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(400).send({ error: 'Post does not exist' });

    const comment = await Comment.create({
      message,
      user: userId,
      post: postId,
    });

    post.commentsCount++;
    post.comments.push(comment._id);
    post.save();

    res.json(comment);
  },
  async update(req, res) {
    const { userId } = req;
    const { commentId, postId } = req.params;
    const { message } = req.body;

    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, user: userId },
      { $set: { message } },
      { new: true },
    );
    res.json({ comment, postId });
  },
  async delete(req, res, next) {
    const { userId } = req;
    const { commentId, postId } = req.params;
    try {
      const deletedComment = await Comment.findOneAndDelete({
        _id: commentId,
        user: userId,
      });
      res.json({ deletedComment, postId });
    } catch (err) {
      next();
    }
  },
};
