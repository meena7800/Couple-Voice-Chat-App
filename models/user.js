const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  displayName: { type: String, required: true },
  email: { type: String },
  passwordHash: { type: String, required: true },
  avatarUrl: { type: String, default: "" },

  diamonds: { type: Number, default: 500 },   // signup bonus
  coins: { type: Number, default: 0 },

  level: { type: Number, default: 0 },
  xp: { type: Number, default: 0 },

  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },

  roles: { type: [String], default: ["user"] }, // user, admin, host

}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
