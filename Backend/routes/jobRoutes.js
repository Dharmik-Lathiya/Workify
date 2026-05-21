const express = require('express');
const router = express.Router();
const {
  postJob,
  updateJob,
  deleteJob,
  toggleSaveJob,
  getRecentJobs,
  getBestMatches,
  getSavedJobs,
  searchJobs
} = require('../controllers/jobController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/post', protect, postJob);
router.put('/update', protect, updateJob);
router.delete('/delete', protect, deleteJob);
router.post('/save', protect, toggleSaveJob);
router.post('/recent', protect, getRecentJobs);
router.post('/best-matches', protect, getBestMatches);
router.post('/saved', protect, getSavedJobs);
router.post('/search', searchJobs);

module.exports = router;
