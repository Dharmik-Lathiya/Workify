const express = require('express');
const router = express.Router();
const { login, signup, sendVerificationOtp } = require('../controllers/authController');
const validationSignup = require('../middlewares/validationSignup');
const validationLogin = require('../middlewares/validationLogin');

router.post('/login', validationLogin, login);
router.post('/signup', validationSignup, signup);
router.post('/verify', sendVerificationOtp);

module.exports = router;
