const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/getAllReviews', reviewController.getAllReviews);
router.get('/getReviewsByProperty/:id', reviewController.getReviewsByProperty);
router.get('/getReviewsByUser/:id', reviewController.getReviewsByUser);
router.post('/createReview', reviewController.createReview); 
router.delete('/deleteReview/:id', reviewController.deleteReview);
router.put('/updateReview/:id', reviewController.updateReview);
router.get('/getRatingStatsByProperty/:id', reviewController.getRatingStatsByProperty);
module.exports = router;