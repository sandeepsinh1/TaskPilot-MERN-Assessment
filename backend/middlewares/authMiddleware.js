const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Fetch the user based on the ID in the token
      req.user = await User.findById(decoded.id).select('-password');
      
      // ⭐️ FIX: Check if the user was actually found before proceeding
      if (!req.user) {
        return res.status(401).json({ message: 'User belonging to this token no longer exists.' });
      }
      
      next();
    } catch (error) {
      // This block handles expired or invalid tokens
      return res.status(401).json({ message: 'Not authorized, token failed or expired.' });
    }
  } else {
    // No token provided at all
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
};

module.exports = protect;