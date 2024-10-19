import express from 'express';
import {
    create,
    getall,
    deleteCoupon,
    getbyid,
    toggleActive,
    updateCoupon,
    availCoupon,
    updateCouponState
} from '../controllers/couponController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, create);
router.get('/getall', authMiddleware, getall);
router.get('/get/:id', authMiddleware, getbyid);
router.delete('/delete/:id', authMiddleware, deleteCoupon);


// updation 
router.put('/toggle-active/:id', authMiddleware, toggleActive);
router.put('/update/:id', authMiddleware, updateCoupon);
router.put('/avail/:id', authMiddleware, availCoupon);
router.put('/update-to-active/:id', authMiddleware, updateCouponState);

export default router;
