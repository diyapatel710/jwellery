// middleware/auth.js
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// middleware/adminAuth.js (content for separate file)
// const auth = require('./auth');
// module.exports = (req, res, next) => {
//   auth(req, res, () => {
//     if (req.user.role !== 'admin')
//       return res.status(403).json({ success: false, message: 'Admin access required' });
//     next();
//   });
// };
