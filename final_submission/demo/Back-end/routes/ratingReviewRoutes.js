const express = require('express');
const router = express.Router();
const ratingReviewController = require('../controllers/ratingReviewController');

// Route for adding ratings & reviews
router.post('/ratings-reviews', async (req, res) => {
  try {
    const newRatingReview = await ratingReviewController.addRatingReview(req.body);
    res.status(201).json(newRatingReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define other routes for ratings & reviews as needed

module.exports = router;
