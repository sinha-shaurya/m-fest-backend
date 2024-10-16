const express = require('express');
const { create,
    getall,
    deleteCoupon,
    getbyid,
    toggleActive,
    updateCoupon,
    availCoupon
} = require('../controllers/couponController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, create);
router.get('/getall', authMiddleware, getall);
router.get('/get/:id', authMiddleware, getbyid);
router.delete('/delete/:id', authMiddleware, deleteCoupon);


// updation 
router.put('/toggle-active/:id', authMiddleware, toggleActive);
router.put('/update/:id', authMiddleware, updateCoupon);
router.put('/avail/:id', authMiddleware, availCoupon);

module.exports = router;
