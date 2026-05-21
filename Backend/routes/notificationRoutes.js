const express = require('express');
const router = express.Router();
const { addNotification, getNotifications } = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/add', protect, addNotification);
router.post('/get', protect, getNotifications);

module.exports = router;
