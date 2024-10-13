const express = require('express');
const {
    signup,
    login,
    signout,
    forgotPassword,
    resetPassword,
    updateProfile,
    getProfileData,
    uploadProfileImage,
    getProfileImageUrl
} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const profileUploadMiddleware = require('../middlewares/profileUploadMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/signout', signout);
router.post('/signout', signout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.put('/update-profile', authMiddleware, updateProfile);
router.get('/profile-data', authMiddleware, getProfileData);

router.post('/upload-profile-image', authMiddleware, profileUploadMiddleware, uploadProfileImage);
router.get('/profile-image-url', authMiddleware, profileUploadMiddleware, getProfileImageUrl);

module.exports = router;
