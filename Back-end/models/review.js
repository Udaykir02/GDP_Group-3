const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewId: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  skuId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  rating: Number,
  review: String
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
