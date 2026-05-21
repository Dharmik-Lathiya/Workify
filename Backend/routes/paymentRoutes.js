const express = require('express');
const router = express.Router();
const { initiatePayment, paymentSuccess, paymentFail } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/pay', protect, initiatePayment);
router.post('/success', paymentSuccess);
router.post('/fail', paymentFail);

module.exports = router;
