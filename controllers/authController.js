const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getGoogleOAuthToken, getGoogleUserInfo } = require('../utils/googleOAuth');
const sendOTPEmail = require('../utils/sendEmail');
const User = require('../models/userModel');
const { generateToken } = require('../config/jwt');
const { sendEmail } = require('../utils/emailService');
const crypto = require('crypto');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  
  res.status(201).json({ token: generateToken(newUser._id), message: 'Signup successful' });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  
  res.json({ token: generateToken(user._id), message: 'Login successful' });
};

const googleSignup = async (req, res) => {
    try {
      const { code } = req.body;  // Authorization code from Google
      const { id_token, access_token } = await getGoogleOAuthToken(code);
      const googleUser = await getGoogleUserInfo(id_token, access_token);
  
      // Check if the user already exists
      let user = await User.findOne({ email: googleUser.email });
      
      if (!user) {
        // Create a new user if they don't exist
        user = new User({
          name: googleUser.name,
          email: googleUser.email,
          googleId: googleUser.id,
          isVerified: true,  // Since Google verifies email
        });
        await user.save();
      }
  
      // Generate JWT token and respond
      const token = generateToken(user._id);
      res.status(200).json({ token, message: 'Google signup successful' });
    } catch (error) {
      res.status(500).json({ message: 'Google OAuth signup failed', error: error.message });
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

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP (you can replace this with any OTP generation logic)
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store OTP in the database (you can save it as part of the user's document)
    user.resetOTP = otp;
    await user.save();

    // Send OTP via EmailJS
    await sendOTPEmail(email, otp);

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

module.exports = { signup, login, googleSignup, signout, forgotPassword, resetPassword };
