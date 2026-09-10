const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/users/wishlist
// @access  Private
router.get('/wishlist', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/users/wishlist/:productId
// @access  Private
router.post('/wishlist/:productId', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.productId;

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ success: false, message: 'Product already in wishlist' });
    }

    user.wishlist.push(productId);
    await user.save({ validateBeforeSave: false });

    res.json({ success: true, message: 'Added to wishlist' });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/users/wishlist/:productId
// @access  Private
router.delete('/wishlist/:productId', auth, async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { wishlist: req.params.productId },
    });
    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
