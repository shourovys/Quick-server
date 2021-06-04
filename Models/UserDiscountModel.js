const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserDiscountSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    businessId: {
      type: String,
      required: true,
    },

    orderId: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
    remain: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const UserDiscount = mongoose.model('UserDiscount', UserDiscountSchema);

module.exports = UserDiscount;
