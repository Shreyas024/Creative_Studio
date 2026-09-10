const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/adminAuth');
const Order = require('../../models/Order');
const User = require('../../models/User');
const Product = require('../../models/Product');

// All routes here require auth + admin
router.use(auth, adminAuth);

/**
 * @desc    Get admin dashboard stats
 * @route   GET /api/admin/dashboard
 * @access  Admin only
 */
router.get('/', async (req, res, next) => {
  try {
    const [totalUsers, totalProducts, totalOrders, recentOrders] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Order.find()
        .populate('user', 'name email')
        .sort('-createdAt')
        .limit(10),
    ]);

    // Revenue calculation
    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, totalRevenue: { $sum: '$total' } } },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        ordersByStatus,
      },
      recentOrders,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
