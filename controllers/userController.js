// controllers/userController.js

const User = require('../models/user');
const Order = require('../models/order');
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
try{
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
}catch(error){
  console.error('Error in authUser:', error);
  res.status(500).json({ message: 'Server error in authUser' });
}  
};

// const getUserProfile = async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     res.json({
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       role: user.role,
//     });
//   } else {
//     res.status(404).json({ message: 'User not found' });
//   }
// };

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch orders for the user
    const orders = await Order.find({ user: req.user._id }).populate('products.product');

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      orders: orders.map(order => ({
        _id: order._id,
        products: order.products.map(product => ({
          product: {
            _id: product.product._id,
            name: product.product.name,
            price: product.product.price,
          },
          quantity: product.quantity,
        })),
        orderDate: order.orderDate,
      })),
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
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
