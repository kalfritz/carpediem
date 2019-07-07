const User = require('../models/User');

module.exports = {
  async setBio(req, res) {
    const { userId } = req;
    const { bio } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: { bio },
      },
      { new: true },
    );
    res.json(updatedUser);
  },
  async setSocialMedia(req, res) {
    const { userId } = req;
    const { socialMedia } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: { socialMedia },
      },
      {
        new: true,
      },
    );
    res.json(updatedUser);
  },
};
