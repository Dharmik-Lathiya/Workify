const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/UserSchema');
const Client = require('../models/ClientSchema');
const Fuse = require('fuse.js');

// @desc    Get user profile
// @route   GET /api/users/:type/:id
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const { type, id } = req.params;

  if (type === 'developer') {
    const user = await User.findById(id).populate(
      'completedProject',
      'jobTitle skills time type price desc files'
    );
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res.json({ success: true, data: user });
  } else {
    const user = await Client.findById(id).populate(
      'postedJobs',
      'jobTitle skills time type price desc files'
    );
    if (!user) {
      res.status(404);
      throw new Error('Client not found');
    }
    res.json({ success: true, data: user });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { id, type, update } = req.body;

  const model = type === 'developer' ? User : Client;
  const user = await model.findByIdAndUpdate(id, { $set: update }, { new: true });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: user
  });
});

// @desc    Add or Update Education
// @route   PUT /api/users/education
// @access  Private/Developer
const updateEducation = asyncHandler(async (req, res) => {
  const { id, eduId, update } = req.body;
  const { school, field, location, country, degree, startDate, endDate, description } = update;

  if (eduId) {
    await User.updateOne(
      { _id: id, "education._id": eduId },
      {
        $set: {
          "education.$.school": school,
          "education.$.degree": degree,
          "education.$.field": field,
          "education.$.location": location,
          "education.$.country": country,
          "education.$.startDate": startDate,
          "education.$.endDate": endDate,
          "education.$.description": description
        }
      }
    );
    res.json({ success: true, message: "Education updated" });
  } else {
    await User.findByIdAndUpdate(id, {
      $push: {
        education: { school, field, location, country, degree, startDate, endDate, description }
      }
    });
    res.json({ success: true, message: "Education added" });
  }
});

// @desc    Delete Education
// @route   DELETE /api/users/education
// @access  Private/Developer
const deleteEducation = asyncHandler(async (req, res) => {
  const { id, eduId } = req.body;
  await User.updateOne({ _id: id }, { $pull: { education: { _id: eduId } } });
  res.json({ success: true, message: "Education deleted" });
});

// @desc    Add or Update Experience
// @route   PUT /api/users/experience
// @access  Private/Developer
const updateExperience = asyncHandler(async (req, res) => {
  const { id, expId, update } = req.body;
  
  if (expId) {
    await User.updateOne(
      { _id: id, "experience._id": expId },
      { $set: { "experience.$": { ...update, _id: expId } } }
    );
    res.json({ success: true, message: "Experience updated" });
  } else {
    await User.findByIdAndUpdate(id, { $push: { experience: update } });
    res.json({ success: true, message: "Experience added" });
  }
});

// @desc    Delete Experience
// @route   DELETE /api/users/experience
// @access  Private/Developer
const deleteExperience = asyncHandler(async (req, res) => {
  const { id, expId } = req.body;
  await User.updateOne({ _id: id }, { $pull: { experience: { _id: expId } } });
  res.json({ success: true, message: "Experience deleted" });
});

// @desc    Add or Update Portfolio
// @route   PUT /api/users/portfolio
// @access  Private/Developer
const updatePortfolio = asyncHandler(async (req, res) => {
  const { id, portId, update } = req.body;
  
  if (portId) {
    await User.updateOne(
      { _id: id, "portfolio._id": portId },
      { $set: { "portfolio.$": { ...update, _id: portId } } }
    );
    res.json({ success: true, message: "Portfolio updated" });
  } else {
    await User.findByIdAndUpdate(id, { $push: { portfolio: update } });
    res.json({ success: true, message: "Portfolio added" });
  }
});

// @desc    Delete Portfolio
// @route   DELETE /api/users/portfolio
// @access  Private/Developer
const deletePortfolio = asyncHandler(async (req, res) => {
  const { id, portId } = req.body;
  await User.updateOne({ _id: id }, { $pull: { portfolio: { _id: portId } } });
  res.json({ success: true, message: "Portfolio deleted" });
});

// @desc    Search users
// @route   POST /api/users/search
// @access  Public
const searchUsers = asyncHandler(async (req, res) => {
  const { query } = req.body;
  const users = await User.find({});

  const options = {
    keys: ["firstName", "lastName", "username"],
    threshold: 0.3,
    distance: 100,
  };

  const fuse = new Fuse(users, options);
  const result = fuse.search(query).map(match => match.item);

  res.json({
    success: true,
    data: result
  });
});

module.exports = {
  getUserProfile,
  updateUserProfile,
  updateEducation,
  deleteEducation,
  updateExperience,
  deleteExperience,
  updatePortfolio,
  deletePortfolio,
  searchUsers
};
