// controllers/userController.js

const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'Strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      // token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0), // immediately expire cookie
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  getUsers,
  logoutUser,
};
