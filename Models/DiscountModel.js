const mongoose = require('mongoose');

const { Schema } = mongoose;

const DiscountSchema = new Schema(
  {
    start: {
      type: Number,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },

    userLimit: {
      type: Number,
      required: true,
    },

    amountLimit: {
      type: Number,
      required: true,
    },
    businessId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Discount = mongoose.model('Discount', DiscountSchema);

module.exports = Discount;
