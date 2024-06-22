const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  registerUser,
  authUser,
  getUserProfile,
  getUsers,
  logoutUser,
} = require('../controllers/userController');

router.route('/').post(registerUser).get(getUsers);
router.post('/login', authUser);
router.get('/profile',protect, getUserProfile);
router.get('/logout', logoutUser);

module.exports = router;
