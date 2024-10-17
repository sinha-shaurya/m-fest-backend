import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import linkRoutes from './routes/linkRoutes.js';
import adminRouter from './config/adminPanel.js';
// import AdminJS from 'adminjs';
// import AdminJSExpress from '@adminjs/express';


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Configure CORS (Allow all origins by default)
app.use(cors());

// Optionally configure CORS with more restrictive settings
/*
const corsOptions = {
    origin: 'http://your-frontend-domain.com', // Restrict to your frontend's domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));
*/

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// AdminJS setup
app.use('/admin', adminRouter);
// const admin = new AdminJS({})

// const adminRouter = AdminJSExpress.buildRouter(admin)
// app.use(admin.options.rootPath, adminRouter);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/link', linkRoutes);

// Start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
