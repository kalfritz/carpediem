const User = require('../models/User');

module.exports = {
  async fix(req, res) {
    const { userId } = req;
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $inc: { groupsCount: +1, ownedGroups: +1 },
      },
      { new: true },
    );
    res.json(user);
  },
};
