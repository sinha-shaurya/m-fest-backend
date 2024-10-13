const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const couponRoutes = require('./routes/couponRoutes');
const linkRoutes = require('./routes/linkRoutes');

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

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/link', linkRoutes);

// Start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
