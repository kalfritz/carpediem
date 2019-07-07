const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const posts = await Post.find()
      .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        options: {
          limit: 2,
          sort: { createdAt: -1 },
        },
      });
    return res.json(posts);
  },
  async feed(req, res) {
    const { userId } = req;
    const { following } = await User.findById(userId);

    const posts = await Post.find({ user: following })
      .limit(15)
      .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        options: {
          limit: 2,
          sort: { createdAt: -1 },
        },
        populate: {
          path: 'likes',
        },
      });
    res.json(posts);
  },
  async getOne(req, res) {
    const post = await Post.findById(req.params.postId)
      .populate('user')
      .populate({
        path: 'comments',
        options: { sort: { createdAt: -1 } },
      });
    return res.json(post);
  },
  async trendPosts(req, res) {
    const posts = await Post.find()
      .sort('-likesCount')
      .populate('user')
      .populate({
        path: 'comments',
        options: { sort: { createdAt: -1 }, limit: 2 },
      });
    res.json(posts);
  },
  async timeline(req, res) {
    const { userId } = req.params;
    const posts = await Post.find({ user: userId })
      .limit(15)
      .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        options: {
          limit: 2,
          sort: { createdAt: -1 },
        },
        populate: {
          path: 'likes',
        },
      });
    res.json(posts);
  },
  async store(req, res) {
    const { message } = req.body;
    const { userId } = req;

    const hashtags = message.split(' ').filter(word => {
      return word.startsWith('#');
    });

    const post = await Post.create({ message, hashtags, user: userId });
    res.json(post);
  },
  async update(req, res) {
    const { userId } = req;
    const { postId } = req.params;
    const { message } = req.body;

    const hashtags = message.split(' ').filter(word => {
      return word.startsWith('#');
    });

    const post = await Post.findOneAndUpdate(
      { _id: postId, user: userId },
      { $set: { message, hashtags } },
      { new: true },
    );
    res.json(post);
  },
  async delete(req, res, next) {
    const { userId } = req;
    const { postId } = req.params;
    try {
      const deletedPost = await Post.findOneAndDelete({
        _id: postId,
        user: userId,
      });
      res.json({ deletedPost });
    } catch (err) {
      next();
    }
  },
};
