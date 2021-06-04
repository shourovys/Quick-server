const mongoose = require('mongoose');

const { Schema } = mongoose;

const foodMenuSchema = new Schema(
  {
    foodMenu: {
      type: [Object],
      required: true,
    },
    businessId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FoodMenu = mongoose.model('foodMenu', foodMenuSchema);

module.exports = FoodMenu;
