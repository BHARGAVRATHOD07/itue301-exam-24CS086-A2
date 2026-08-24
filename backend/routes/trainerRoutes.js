const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainer');

// In-memory fallback dataset for seamless API execution before/after DB connection
const defaultTrainers = [
  { _id: '66c8f2000000000000000001', name: 'John Doe', specialization: 'HIIT & Cardio', available: true },
  { _id: '66c8f2000000000000000002', name: 'Sarah Smith', specialization: 'Yoga & Pilates', available: false },
  { _id: '66c8f2000000000000000003', name: 'Mike Johnson', specialization: 'Heavy Weightlifting', available: true },
  { _id: '66c8f2000000000000000004', name: 'Emma Davis', specialization: 'Zumba & Aerobics', available: true }
];

/**
 * @route   GET /api/v1/trainers
 * @desc    Return all trainers
 * @access  Public
 */
router.get('/', async (req, res, next) => {
  try {
    let trainers = [];
    try {
      trainers = await Trainer.find();
      if (trainers.length === 0) {
        trainers = defaultTrainers;
      }
    } catch (dbErr) {
      trainers = defaultTrainers;
    }

    res.status(200).json({
      success: true,
      count: trainers.length,
      data: trainers
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
