// middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');


const protect = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');

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
    // if(!req.user){
    //   res.status(401).json({ message: 'Not authorized, no token' });
    // }
    // console.log(req.user);
    if(req.user && req.user.role === 'admin'){
      next();
    }
  }catch(error){ 
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };
