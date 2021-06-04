// Business;

const mongoose = require('mongoose');

const { Schema } = mongoose;

const businessSchema = new Schema(
  {
    businessCategory: {
      type: String,
      default: 'restaurant',
    },
    businessName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    fastName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
      min: 11,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
    deliveryService: {
      type: String,
      required: true,
    },
    isActiveByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
