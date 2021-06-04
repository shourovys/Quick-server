const mongoose = require('mongoose');

const { Schema } = mongoose;

const categoriesSchema = new Schema(
  {
    businessId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    type: {
      type: String,
      required: true,
    },
    disruption: {
      type: String,
    },
  },
  { timestamps: true },
);

const Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;
