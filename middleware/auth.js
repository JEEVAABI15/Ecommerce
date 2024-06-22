// middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');


const protect = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    console.log('No token found in cookies');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    req.user = await User.findById(decoded.id).select('-password');
    console.log('User found:', req.user); 

    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

const admin = (req, res, next) => {
  try{
    if(!req.user){
      console.log('No user found in request');
      res.status(401).json({ message: 'Not authorized, no token' });
    }
    console.log('User:', req.user);
    if(req.user && req.user.role === 'admin'){
      next();
    }
  }catch(error){ 
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };
