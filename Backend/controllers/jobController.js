const asyncHandler = require('../utils/asyncHandler');
const Job = require('../models/JobSchema');
const Client = require('../models/ClientSchema');
const User = require('../models/UserSchema');
const Fuse = require('fuse.js');

// @desc    Post a new job
// @route   POST /api/jobs
// @access  Private/Client
const postJob = asyncHandler(async (req, res) => {
  const { clientId } = req.body;
  const date = new Date();
  
  const newJob = new Job({
    ...req.body,
    curtime: date.toUTCString()
  });
  
  const job = await newJob.save();

  if (job) {
    await Client.findByIdAndUpdate(clientId, { $push: { postedJobs: job._id } });
    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      data: job
    });
  } else {
    res.status(400);
    throw new Error('Invalid job data');
  }
});

// @desc    Update a job
// @route   PUT /api/jobs
// @access  Private/Client
const updateJob = asyncHandler(async (req, res) => {
  const { id, update } = req.body;
  
  const job = await Job.findByIdAndUpdate(id, { $set: update }, { new: true });

  if (job) {
    res.json({
      success: true,
      message: 'Job updated successfully',
      data: job
    });
  } else {
    res.status(404);
    throw new Error('Job not found');
  }
});

// @desc    Delete a job
// @route   DELETE /api/jobs
// @access  Private/Client
const deleteJob = asyncHandler(async (req, res) => {
  const { id } = req.body;
  
  const job = await Job.findById(id);
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  await Job.findByIdAndDelete(id);
  await Client.findByIdAndUpdate(job.clientId, { $pull: { postedJobs: id } });

  res.json({
    success: true,
    message: 'Job deleted successfully'
  });
});

// @desc    Save/Unsave a job
// @route   POST /api/jobs/save
// @access  Private/Developer
const toggleSaveJob = asyncHandler(async (req, res) => {
  const { id, jobId, type } = req.body; // id is userId

  const update = type === 'save' ? { $push: { savedJobs: jobId } } : { $pull: { savedJobs: jobId } };
  
  const user = await User.findByIdAndUpdate(id, update, { new: true });

  if (user) {
    res.json({
      success: true,
      message: type === 'save' ? 'Job saved' : 'Job unsaved'
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get recent jobs matching skills
// @route   POST /api/jobs/recent
// @access  Private
const getRecentJobs = asyncHandler(async (req, res) => {
  const { skills } = req.body;

  const jobs = await Job.aggregate([
    {
      $addFields: {
        matchCount: { $size: { $setIntersection: ["$skills", skills || []] } }
      }
    },
    { $sort: { matchCount: -1, curtime: -1 } }
  ]);

  res.json({
    success: true,
    data: jobs
  });
});

// @desc    Get best match jobs
// @route   POST /api/jobs/best-matches
// @access  Private
const getBestMatches = asyncHandler(async (req, res) => {
  const { skills } = req.body;

  const jobs = await Job.aggregate([
    {
      $addFields: {
        matchCount: { $size: { $setIntersection: ["$skills", skills || []] } }
      }
    },
    { $sort: { matchCount: -1 } }
  ]);

  res.json({
    success: true,
    data: jobs
  });
});

// @desc    Get saved jobs for a user
// @route   POST /api/jobs/saved
// @access  Private/Developer
const getSavedJobs = asyncHandler(async (req, res) => {
  const { id } = req.body;
  
  const user = await User.findById(id).populate('savedJobs', 'jobTitle skills curtime type price desc');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    success: true,
    data: user.savedJobs
  });
});

// @desc    Search jobs
// @route   POST /api/jobs/search
// @access  Public
const searchJobs = asyncHandler(async (req, res) => {
  const { query } = req.body;
  const jobs = await Job.find({});
  
  const options = {
    keys: ["jobTitle", "skills"],
    threshold: 0.5,
    distance: 100,
  };

  const fuse = new Fuse(jobs, options);
  const result = fuse.search(query).map(match => match.item);

  res.json({
    success: true,
    data: result
  });
});

module.exports = {
  postJob,
  updateJob,
  deleteJob,
  toggleSaveJob,
  getRecentJobs,
  getBestMatches,
  getSavedJobs,
  searchJobs
};
