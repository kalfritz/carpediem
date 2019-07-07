const User = require('../models/User');
const Group = require('../models/Group');

module.exports = {
  async index(req, res) {
    const groups = await Group.find().sort('-createdAt');

    return res.json(groups);
  },
  async getOne(req, res) {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    return res.json(group);
  },
  async store(req, res) {
    //const { description, tags } = req.body;
    const { userId, groups } = req;

    console.log('groups:' + groups);
    const group = await Group.create({
      ...req.body,
      owner: userId,
    });
    const updatedGroup = await Group.findOneAndUpdate(
      { _id: group._id },
      {
        $push: { members: userId, mods: userId },
      },
      { new: true },
    );
    const owner = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { groups: group._id },
        $inc: { groupsCount: +1, ownedGroups: +1 },
      },
    );
    res.json({
      updatedGroup,
      owner,
    });
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
    const { groupId } = req.params;
    try {
      const deletedGroup = await Group.findOneAndDelete({
        _id: groupId,
        owner: userId,
      });
      const owner = await User.findOneAndUpdate(
        { _id: userId },
        {
          $pull: { groups: groupId },
          $inc: { groupsCount: -1, ownedGroups: -1 },
        },
        { new: true },
      );
      res.json({ deletedGroup, owner });
    } catch (err) {
      next(err);
    }
  },
};
