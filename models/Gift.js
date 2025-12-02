const mongoose = require('mongoose');

const GiftSchema = new mongoose.Schema({
  giftId: { type: String, unique: true },
  name: String,
  diamondCost: Number,
  coinValueForReceiver: Number,
  animation: String
});

module.exports = mongoose.model('Gift', GiftSchema);
