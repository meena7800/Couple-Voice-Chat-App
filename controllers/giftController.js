const Gift = require('../models/Gift');
const User = require('../models/User');
const GiftTx = require('../models/GiftTransaction');
const { addXP } = require('../utils/level');

async function listGifts(req, res) {
  const gifts = await Gift.find().lean();
  res.json({ gifts });
}

async function sendGift(req, res) {
  const userId = req.user.id;
  const { roomId, giftId, toUserId } = req.body;
  const gift = await Gift.findOne({ giftId });
  if (!gift) return res.status(400).json({ error: 'Invalid gift' });

  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ error: 'User not found' });
  if (user.diamonds < gift.diamondCost) return res.status(400).json({ error: 'Not enough diamonds' });

  // debit diamonds
  user.diamonds -= gift.diamondCost;
  // give XP to sender
  addXP(user, Math.floor(gift.diamondCost / 10));
  await user.save();

  // credit coins to recipient (typically host)
  const recipient = await User.findById(toUserId);
  if (recipient) {
    recipient.coins += gift.coinValueForReceiver;
    addXP(recipient, Math.floor(gift.coinValueForReceiver / 50));
    await recipient.save();
  }

  // log transaction
  await GiftTx.create({
    fromUser: userId,
    toUser: toUserId,
    roomId,
    giftId,
    diamondsSpent: gift.diamondCost,
    coinsCredited: gift.coinValueForReceiver
  });

  // Notify via socket.io (server will emit)
  const payload = {
    fromUser: userId,
    toUser: toUserId,
    gift,
    newDiamonds: user.diamonds,
    recipientCoins: recipient ? recipient.coins : 0
  };

  // if io available on req.app
  if (req.app && req.app.get('io')) {
    req.app.get('io').to(`room_${roomId}`).emit('gift_sent', payload);
  }

  res.json({ success: true, payload });
}

module.exports = { listGifts, sendGift };
