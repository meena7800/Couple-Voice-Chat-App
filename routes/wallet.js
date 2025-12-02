const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { buyDiamondsWebhook, requestPayout } = require('../controllers/wallet');

router.post('/webhook/credit', buyDiamondsWebhook); // dev use
router.post('/payout', auth, requestPayout);

module.exports = router;
