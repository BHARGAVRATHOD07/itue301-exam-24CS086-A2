const jwt = require('jsonwebtoken');

/**
 * Task 3 Requirement: Custom authGuard middleware
 * Validates Bearer token and attaches req.member.
 * Returns 401 for missing/invalid auth.
 */
const authGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Authentication failed: Missing or invalid Bearer token'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'fitzone_secret_key_24cs086';
    const decoded = jwt.verify(token, secret);
    req.member = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Authentication failed: Invalid or expired token'
    });
  }
};

module.exports = authGuard;
