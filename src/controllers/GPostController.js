const GPost = require('../models/GPost');
const Group = require('../models/Group');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const gposts = await GPost.find().sort('-createdAt');

    return res.json(gposts);
  },
  async getOne(req, res) {
    const { groupId, gpostId } = req.params;
    const gpost = await GPost.findById(gpostId);
    return res.json({ gpost, groupId });
  },
  async feed(req, res) {
    const { userId } = req;
    const { groups } = await User.findById(userId);

    const gposts = await GPost.find({ group: groups })
      .limit(15)
      .sort('-createdAt');
    res.json(gposts);
  },
  async timeline(req, res) {
    const { groupId } = req.params;
    const gposts = await GPost.find({ group: groupId })
      .limit(15)
      .sort('-createdAt');

    res.json(gposts);
  },
  async store(req, res) {
    const { message } = req.body;
    const { userId } = req;
    const { groupId } = req.params;

    const { members } = await Group.findOne({ _id: groupId });

    const isAMember = members.some(member => {
      console.log(`member: ${member}. user: ${userId}`);
      //i dont understand why it only works with == and not with === but ok
      return member == userId;
    });
    if (isAMember) {
      const gpost = await GPost.create({
        message,
        user: userId,
        group: groupId,
      });
      res.json(gpost);
    } else {
      res.json({ error: 'you are not a member :(' });
    }
  },
  async update(req, res) {
    const { userId } = req;
    const { gpostId, groupId } = req.params;
    const { message } = req.body;

    const gpost = await GPost.findOneAndUpdate(
      { _id: gpostId, user: userId, group: groupId },
      { $set: { message } },
      { new: true },
    );
    res.json(gpost);
  },
  async delete(req, res, next) {
    const { userId } = req;
    const { gpostId, groupId } = req.params;
    try {
      const deletedGPost = await GPost.findOneAndDelete({
        _id: gpostId,
        user: userId,
        group: groupId,
      });
      res.json({ deletedGPost });
    } catch (err) {
      next();
    }
  },
};
