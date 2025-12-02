const express = require('express');
const router = express.Router();
const { createRoom, listRooms, joinRoom } = require('../controllers/roomController');
const auth = require('../middleware/auth');

router.get('/', listRooms);
router.post('/', auth, createRoom);
router.post('/:roomId/join', auth, joinRoom);

module.exports = router;
