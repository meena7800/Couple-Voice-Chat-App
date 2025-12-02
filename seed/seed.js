require('dotenv').config();
const connectDB = require('../config/db');
const Gift = require('../models/Gift');
const User = require('../models/User');

async function seed() {
  await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/achat');

  const gifts = [
    { giftId: 'rocket', name: 'Rocket', diamondCost: 100, coinValueForReceiver: 100, animation: 'rocket.json' },
    { giftId: 'trophy', name: 'Trophy', diamondCost: 500, coinValueForReceiver: 500, animation: 'trophy.json' },
    { giftId: 'rose', name: 'Rose', diamondCost: 10, coinValueForReceiver: 10, animation: 'rose.json' }
  ];

  for (const g of gifts) {
    await Gift.updateOne({ giftId: g.giftId }, { $set: g }, { upsert: true });
  }

  // create admin/test user
  const exists = await User.findOne({ username: 'rajesh' });
  if (!exists) {
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('password', 10);
    await User.create({
      username: 'rajesh',
      displayName: 'Rajesh',
      passwordHash: hash,
      diamonds: 1000,
      coins: 0,
      level: 10,
      xp: 1000,
      roles: ['admin']
    });
  }

  console.log('Seed completed');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
