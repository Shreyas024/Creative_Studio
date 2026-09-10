const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getProductReviews, createReview, getFeaturedReviews } = require('../controllers/reviewController');

router.get('/featured', getFeaturedReviews);
router.get('/:productId', getProductReviews);
router.post('/', auth, createReview);

module.exports = router;
