const express = require('express');
const { create, getall, deleteCoupon, getbyid } = require('../controllers/couponController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, create);
// router.post('/update', login);
// router.post('/delete', signout);
router.get('/getall', authMiddleware, getall);
router.get('/get/:id', authMiddleware, getbyid);
router.delete('/delete/:id', authMiddleware, deleteCoupon);

module.exports = router;
