const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const SocialMedia = new mongoose.Schema({
  twitter: String,
  github: String,
  instagram: String,
  linkedin: String,
  facebook: String,
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      select: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },

    socialMedia: {
      type: [SocialMedia],
      select: false,
    },
    bio: {
      type: String,
      select: false,
    },

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`,
      },
    ],
    followingCount: {
      type: Number,
      default: 0,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`,
      },
    ],
    followersCount: {
      type: Number,
      default: 0,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'profile',
      select: false,
    },
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group',
      },
    ],
    groupsCount: {
      type: Number,
      default: 0,
    },
    ownedGroups: {
      type: Number,
      default: 0,
      max: 3,
    },
  },
  {
    timestamps: true,
  },
);
UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;

  console.log('I WAS TRIGGERED!');

  next();
});

UserSchema.pre('update', async function(next) {
  console.log('wow');
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
