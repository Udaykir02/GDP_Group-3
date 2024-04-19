const RatingReview = require('../models/RatingReview');

module.exports = {
  addRatingReview: async (ratingReviewData) => {
    try {
      return await RatingReview.insertMany(ratingReviewData);
    } catch (error) {
      console.error("Error adding ratings & reviews:", error);
      throw new Error('Failed to add ratings & reviews to the database');
    }
  },
  // Other rating & review-related controller functions...
};