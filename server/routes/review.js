const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { midVerification } = require('../config/jwt');

// GET /reviews - Get all reviews
router.get('/reviews', reviewController.getAllReviews);

// GET /reviews/:id - Get a specific review by ID
router.get('/:id', reviewController.getReviewById);

// GET /reviews/property/:propertyId - Get reviews by property
router.get('/property/:propertyId', reviewController.getReviewsByProperty);

// GET /reviews/user/:userId - Get reviews by user
router.get('/user/:userId', reviewController.getReviewsByUser);

// GET /reviews/property/:id/stats - Get rating statistics for a property
router.get('/property/:id/stats', reviewController.getRatingStatsByProperty);

// POST /reviews - Create a new review (requires authentication)
router.post('/', midVerification, reviewController.createReview);

// PUT /reviews/:id - Update a review (requires authentication)
router.put('/:id', midVerification, reviewController.updateReview);

// DELETE /reviews/:id - Delete a review (requires authentication)
router.delete('/:id', midVerification, reviewController.deleteReview);

module.exports = router;