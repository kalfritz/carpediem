const mongoose = require('../database');

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `User`,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`,
      },
    ],
    membersCount: {
      type: Number,
      default: 1,
    },
    mods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`,
      },
    ],
    modsCount: {
      type: Number,
      default: 1,
    },
    image: String,
    description: String,
    privacy: {
      type: String,
      default: 'private',
    },
    tags: {
      type: [String],
      default: ['general'],
    },
  },
  {
    timestamps: true,
  },
);

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
