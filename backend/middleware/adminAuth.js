/**
 * Admin-only middleware — MUST be used after auth middleware.
 * Completely blocks regular users from accessing admin routes.
 * Returns 403 Forbidden if user role is not 'admin'.
 */
const adminAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized — authentication required',
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied — admin privileges required',
    });
  }

  next();
};

module.exports = adminAuth;
