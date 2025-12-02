const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

async function signup(req, res) {
  const { username, displayName, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ error: 'Username taken' });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    displayName: displayName || username,
    passwordHash: hash,
    diamonds: 500 // signup bonus
  });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });
  res.json({ token, user });
}

async function login(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ error: 'Invalid' });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });
  res.json({ token, user });
}

module.exports = { signup, login };
