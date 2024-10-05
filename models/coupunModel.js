const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: [String], // list of categories
    required: true
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId, // references id from another table
    ref: 'User', // assuming you have an 'Owner' model or similar
    required: true
  },
  validTill: {
    type: Date,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  style: {
    type: mongoose.Schema.Types.Mixed, // JSON object
    required: false
  },
  active: {
    type: Boolean,
    default: true
  }
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
