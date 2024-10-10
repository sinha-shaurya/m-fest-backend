const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const couponRoutes = require('./routes/couponRoutes');
const linkRoutes = require('./routes/linkRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/link', linkRoutes);

// test routes

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
