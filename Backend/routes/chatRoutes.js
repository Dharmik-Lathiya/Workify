const express = require('express');
const router = express.Router();
const { addChat, getChats } = require('../controllers/chatController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/add', protect, addChat);
router.post('/get', protect, getChats);

module.exports = router;
