const mongoose = require('mongoose');

const { Schema } = mongoose;

const foodItemSchema = new Schema(
  {
    businessId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: true,
    },
    menuTime: {
      type: [String],
      required: true,
      default: ['Breakfast', 'Lunch', 'Diner'],
    },
    image: {
      type: String,
      required: true,
    },

    sizePrice: {
      type: [Object],
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    totalRating: {
      type: Number,
      required: true,
      default: 0,
    },
    totalReview: {
      type: Number,
      required: true,
      default: 0,
    },
    isEnable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;
// {
//   id: 4,
//   name: "ByProgrammers Sushi",
//   rating: 4.8,
//   categories: [8],
//   priceRating: expensive,
//   photo: images.japanese_restaurant,
//   sizePrice: [
//     {
//       size: "full",
//       price: 100,
//     },
//     {
//       size: "half",
//       price: 50,
//     },
//     {
//       size: "queer",
//       price: 25,
//     },
//   ],
