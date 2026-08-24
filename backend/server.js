const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Body Parser & CORS
app.use(cors());
app.use(express.json());

// Task 3 Requirement: Global Request Logger Middleware applied to every request
app.use(requestLogger);

// API Endpoints under /api/v1/
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/trainers', trainerRoutes);
app.use('/api/v1/bookings', bookingRoutes);

// Root route for sanity check
app.get('/', (req, res) => {
  res.json({
    message: 'FitZone Gym & Class Booking System API v1',
    status: 'Active',
    student: '24CS086 (Batch A2)'
  });
});

// Task 3 Requirement: Global error-handling middleware registered LAST
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fitzone_db';

// Start Server immediately, then connect Mongoose asynchronously
app.listen(PORT, () => {
  console.log(`🚀 FitZone Backend Server running on http://localhost:${PORT}`);
  
  mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 3000 })
    .then(() => {
      console.log('✅ Connected to MongoDB successfully.');
    })
    .catch((err) => {
      console.warn('⚠️ MongoDB connection warning (offline/fallback mode):', err.message);
    });
});
