const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  updateEducation,
  deleteEducation,
  updateExperience,
  deleteExperience,
  updatePortfolio,
  deletePortfolio,
  searchUsers
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/profile/:type/:id', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/education', protect, updateEducation);
router.delete('/education', protect, deleteEducation);
router.put('/experience', protect, updateExperience);
router.delete('/experience', protect, deleteExperience);
router.put('/portfolio', protect, updatePortfolio);
router.delete('/portfolio', protect, deletePortfolio);
router.post('/search', searchUsers);

module.exports = router;
