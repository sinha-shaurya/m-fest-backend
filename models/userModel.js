// const mongoose = require('mongoose');
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String, default: null },
  isVerified: { type: Boolean, default: false },
  isProfileCompleted: { type: Boolean, default: false },
  type: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: false },
  profileImage: { type: String, required: false, unique: false },
  createdCouponsId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Coupon',
    default: []
  },
  availedCouponsId: [
    {
      couponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon'
      },
      dateAdded: {
        type: Date,
        default: Date.now
      },
      status: {
        type: String,
        enum: ['ACTIVE', 'EXPIRED', 'REDEEMED'],
        default: 'REDEEMED'
      },
      totalPrice: {
        type: Number,
        required: true,
        default: 0
      }
    }
  ],
  couponCount: {
    type: Number,
    required: true,
    default: 2
  }, 
  phone: {
    type: String,
    required: false,
    unique: true,
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
