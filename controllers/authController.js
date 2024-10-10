const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const crypto = require('crypto');
const { sendEmail } = require('../utils/sendEmail');
const { generateToken } = require('../config/jwt');

const signup = async (req, res) => {
  try {
    const { name, email, password, type } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, type });
    await newUser.save();

    res.status(201).json({ token: generateToken(newUser._id), message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ token: generateToken(user._id), message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};


const signout = (req, res) => {
  // Clear JWT token or user session
  res.json({ message: 'Signout successful' });
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    await user.save();

    // Send OTP via EmailJS
    console.log(user.email);
    await sendEmail(user.email, "Reset Password OTP", "Otp to reset pass for your AASH india app is : " + otp);

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email, otp });
  if (!user) return res.status(400).json({ message: 'Invalid OTP' });

  user.password = await bcrypt.hash(newPassword, 10);
  user.otp = null;
  await user.save();

  res.json({ message: 'Password reset successful' });
};
const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log('UserID:', userId);
    console.log('Request Body:', req.body);

    const isDataNotEmpty = Object.keys(req.body).length > 0;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        data: req.body,  // Updating the Mixed type field
        isProfileCompleted: isDataNotEmpty ? true : false,
      },
      { new: true }  // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProfileData = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({data: user.data, isProfileCompleted: user.isProfileCompleted, name: user.name, email: user.email, type: user.type});
  } catch (error) {
    console.error('Error getting profile data:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { signup, login, signout, forgotPassword, resetPassword, updateProfile, getProfileData };
