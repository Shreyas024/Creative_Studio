const Review = require('../models/Review');
const Product = require('../models/Product');

/**
 * @desc    Get reviews for a product
 * @route   GET /api/reviews/:productId
 * @access  Public
 */
exports.getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      isApproved: true,
    })
      .populate('user', 'name avatar')
      .sort('-createdAt');

    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a review
 * @route   POST /api/reviews
 * @access  Private
 */
exports.createReview = async (req, res, next) => {
  try {
    const { product, rating, title, comment } = req.body;

    // Check for existing review
    const existingReview = await Review.findOne({ user: req.user._id, product });
    if (existingReview) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
    }

    const review = await Review.create({
      user: req.user._id,
      product,
      rating,
      title,
      comment,
    });

    // Update product rating
    const reviews = await Review.find({ product, isApproved: true });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(product, {
      'ratings.average': Math.round(avgRating * 10) / 10,
      'ratings.count': reviews.length,
    });

    res.status(201).json({ success: true, review });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get featured/recent reviews for homepage testimonials
 * @route   GET /api/reviews/featured
 * @access  Public
 */
exports.getFeaturedReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ isApproved: true, rating: { $gte: 4 } })
      .populate('user', 'name avatar')
      .populate('product', 'name slug images')
      .sort('-createdAt')
      .limit(6);

    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    next(error);
  }
};
