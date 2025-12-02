const Room = require('../models/Room');
const User = require('../models/User');
// For agora token generation you'll need Agora SDK — here we return placeholders.

async function createRoom(req, res) {
  const { title, category, maxParticipants, isOfficial } = req.body;
  const hostId = req.user.id;
  const room = await Room.create({
    title,
    category,
    maxParticipants: maxParticipants || 100,
    hostId,
    isOfficial: !!isOfficial
  });
  res.json({ room });
}

async function listRooms(req, res) {
  const rooms = await Room.find({ active: true }).limit(50).lean();
  res.json({ rooms });
}

async function joinRoom(req, res) {
  const roomId = req.params.roomId;
  const userId = req.user.id;
  const room = await Room.findById(roomId);
  if (!room) return res.status(404).json({ error: 'No room' });

  // TODO: create ephemeral presence in Redis / socket join
  // Generate Agora token (placeholder) — you must implement server-side token using app cert
  const agoraToken = 'AGORA_TOKEN_PLACEHOLDER';
  const channelName = `room_${roomId}`;

  res.json({ roomId, channelName, agoraToken });
}

module.exports = { createRoom, listRooms, joinRoom };
