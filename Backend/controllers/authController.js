const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/UserSchema');
const Client = require('../models/ClientSchema');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const nodemailer = require('nodemailer');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { value, password } = req.body;

  let user = await User.findOne({
    $or: [{ email: value }, { username: value }],
  });
  let type = 'developer';

  if (!user) {
    user = await Client.findOne({
      $or: [{ email: value }, { username: value }],
    });
    type = 'client';
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      success: true,
      message: 'Login successful',
      type,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid email, username or password');
  }
});

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signup = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password, type } = req.body;

  const model = type === 'client' ? Client : User;
  const userExists = await model.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await model.create({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
    ...req.body // include other fields if any
  });

  if (user) {
    res.status(201).json({
      success: true,
      message: 'Signup successful',
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Send verification OTP
// @route   POST /api/auth/verify
// @access  Public
const sendVerificationOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Workify Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Otp for verification",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Verify Your Email</h2>
          <p style="font-size: 16px; color: #555; text-align: center;">
              Your One-Time Password (OTP) for Workify is:
          </p>
          <div style="font-size: 24px; font-weight: bold; color: #007bff; text-align: center; margin: 15px 0;">
              ${otp}
          </div>
          <p style="font-size: 14px; color: #777; text-align: center;">
              This OTP is valid for 10 minutes. Do not share it with anyone.
          </p>
          <hr style="border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #888; text-align: center;">
              If you did not request this, please ignore this email.
          </p>
      </div>
    `,
  });

  res.json({
    success: true,
    message: 'OTP sent successfully',
    data: { otp }
  });
});

module.exports = {
  login,
  signup,
  sendVerificationOtp,
};
