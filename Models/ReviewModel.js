const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    menuId: {
      type: String,
      required: true,
    },
    foodId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
