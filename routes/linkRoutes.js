import express from 'express';
import { linkData } from '../controllers/linkController.js';

const router = express.Router();

router.get('/', linkData);

export default router;
