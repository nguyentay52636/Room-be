const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { midVerification } = require("../config/jwt");

// GET /review
router.get("/", reviewController.getAllReviews);

// GET /review/:id
router.get("/:id", reviewController.getReviewById);

// GET /review/property/:propertyId
router.get("/property/:propertyId", reviewController.getReviewsByProperty);

// GET /review/user/:userId
router.get("/user/:userId", reviewController.getReviewsByUser);

// GET /review/property/:id/stats
router.get("/property/:id/stats", reviewController.getRatingStatsByProperty);

// POST /review
router.post("/", midVerification, reviewController.createReview);

// PUT /review/:id
router.put("/:id", midVerification, reviewController.updateReview);

// DELETE /review/:id
router.delete("/:id", midVerification, reviewController.deleteReview);

module.exports = router;
