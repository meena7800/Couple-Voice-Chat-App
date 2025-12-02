const mongoose = require('mongoose');

const GiftTxSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  giftId: String,
  diamondsSpent: Number,
  coinsCredited: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GiftTransaction', GiftTxSchema);
