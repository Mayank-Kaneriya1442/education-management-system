const { HttpError } = require('../utils/httpError');
const { verifyToken } = require('../utils/jwt');
const { User } = require('../models/User');

async function requireAuth(req, res, next) {
  const header = req.headers.authorization ?? '';
  const [, token] = header.split(' ');
  if (!token) return next(new HttpError(401, 'Missing Authorization token'));

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.sub).select('+passwordHash');
    if (!user || !user.isActive) return next(new HttpError(401, 'Invalid user'));
    req.user = user;
    return next();
  } catch (e) {
    return next(new HttpError(401, 'Invalid or expired token'));
  }
}

function requireRole(...roles) {
  return function (req, res, next) {
    if (!req.user) return next(new HttpError(401, 'Unauthorized'));
    if (!roles.includes(req.user.role)) return next(new HttpError(403, 'Forbidden'));
    return next();
  };
}

module.exports = { requireAuth, requireRole };

