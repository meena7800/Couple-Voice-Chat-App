const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { listGifts, sendGift } = require('../controllers/giftController');

router.get('/', listGifts);
router.post('/send', auth, sendGift);

module.exports = router;
