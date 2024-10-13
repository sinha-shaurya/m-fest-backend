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

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only images are allowed (jpeg, jpg, png)'), false); // Reject the file
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Serve static files in the 'uploads' folder
app.use('/uploads', express.static('uploads'));

// Define the image upload route
app.post('/uploadimage', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded or invalid file type.' });
  }

  // Construct the URL where the image can be viewed
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  res.json({ message: 'Image uploaded successfully', imageUrl });
});

// Define the route to get the image viewing URL
app.get('/viewimage/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  // Check if the file exists before sending the URL
  if (fs.existsSync(filePath)) {
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
    res.json({ imageUrl });
  } else {
    res.status(404).json({ message: 'Image not found' });
  }
});


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
