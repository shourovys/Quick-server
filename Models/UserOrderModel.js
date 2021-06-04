const mongoose = require('mongoose');

const { Schema } = mongoose;

const userOrderSchema = new Schema(
  {
    ordersItems: {
      type: [Object],
      required: true,
    },
    resId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    tableNo: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    orderType: {
      type: String,
      default: 'new',
      required: true,
    },
    reviewTake: {
      type: Boolean,
      default: false,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const UserOrders = mongoose.model('UserOrders', userOrderSchema);

module.exports = UserOrders;
