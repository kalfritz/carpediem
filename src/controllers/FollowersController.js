const User = require('../models/User');

module.exports = {
  async follow(req, res) {
    const { followUserId } = req.params;
    const { userId } = req;

    //ADD A FOLLOWER TO THE TARGET USER
    await User.findByIdAndUpdate(followUserId, {
      $addToSet: { followers: userId },
      //actually I only want to incremment by one if really there isnt already a value
      $inc: { followersCount: +1 },
    });

    //ADD A FOLLOWING TO THE REQ USER
    await User.findByIdAndUpdate(userId, {
      $addToSet: { following: followUserId },
      //actually I only want to incremment by one if really there isnt already a value
      $inc: { followingCount: +1 },
    });

    res.json({ message: 'ok' });
  },
  async unfollow(req, res) {
    const { unfollowUserId } = req.params;
    const { userId } = req;

    await User.findByIdAndUpdate(unfollowUserId, {
      $pull: { followers: userId },
      $inc: { followersCount: -1 },
    });

    await User.findByIdAndUpdate(userId, {
      $pull: { following: unfollowUserId },
      $inc: { followingCount: -1 },
    });

    res.json({ message: 'ok' });
  },
};
