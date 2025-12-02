const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  title: String,
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isOfficial: { type: Boolean, default: false },
  mode: { type: String, default: 'public' },
  maxParticipants: { type: Number, default: 100 },
  category: String,
  roomAvatar: String,
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);
