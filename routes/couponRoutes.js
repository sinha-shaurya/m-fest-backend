const express = require('express');
const { create, getall, deleteCoupon, getbyid, toggleActive, updateCoupon } = require('../controllers/couponController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, create);
router.get('/getall', authMiddleware, getall);
router.get('/get/:id', authMiddleware, getbyid);
router.delete('/delete/:id', authMiddleware, deleteCoupon);


// updation 
router.put('/toggle-active/:id', authMiddleware, toggleActive);
router.put('/update/:id', authMiddleware, updateCoupon);

module.exports = router;
