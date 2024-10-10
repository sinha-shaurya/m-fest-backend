const express = require('express');
const { signup, login, signout, forgotPassword, resetPassword, updateProfile} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/signout', signout);
router.post('/signout', signout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.put('/update-profile', authMiddleware, updateProfile);

module.exports = router;
