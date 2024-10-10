const Coupon = require('../models/coupunModel');

// Create a new coupon
const create = async (req, res) => {
  try {
    const { title, category, discountPercentage, validTill, style, active } = req.body;

    // Use the user ID from the token (req.user)
    console.log(req.user);
    const ownerId = req.user._id;
    console.log(ownerId);
    const newCoupon = new Coupon({
      title,
      category,
      discountPercentage,
      ownerId, // Assigning the authenticated user as the owner
      validTill,
      style,
      active
    });

    await newCoupon.save();

    res.status(201).json({
      message: 'Coupon created successfully',
      coupon: newCoupon
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating coupon',
      error: error.message
    });
  }
};

// Get all coupons
const getall = async (req, res) => {
  try {
    const coupons = await Coupon.find();

    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching coupons',
      error: error.message
    });
  }
};
const getbyid = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the coupon by ID
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching coupon',
      error: error.message
    });
  }
}

const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the coupon by ID
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    console.log(deletedCoupon);
    if (!deletedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json({ message: 'Coupon deleted successfully', deletedCoupon });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting coupon',
      error: error.message
    });
  }
};

const toggleActive = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    coupon.active = !coupon.active;
    await coupon.save();
    res.status(200).json({ message: 'Coupon status toggled successfully', coupon });
  } catch (error) {
    res.status(500).json({
      message: 'Error toggling coupon status',
      error: error.message
    });
  }
}

const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.status(200).json({ message: 'Coupon updated successfully', updatedCoupon });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating coupon',
      error: error.message
    });
  }
}

module.exports = { create, getall, deleteCoupon, getbyid, toggleActive, updateCoupon };
