const express = require('express');
const router = express.Router();
const ClassBooking = require('../models/ClassBooking');
const authGuard = (require('../middleware/authGuard'));

// Apply authGuard middleware to all booking routes
router.use(authGuard);

// In-memory array store fallback if MongoDB is connecting/offline
let memoryBookings = [];

/**
 * @route   POST /api/v1/bookings
 * @desc    Create a new class booking
 * @access  Protected
 */
router.post('/', async (req, res, next) => {
  try {
    const { trainerId, className, date, timeSlot } = req.body;
    const memberId = req.member.id;

    // Basic validation check
    if (!trainerId || !className || !date || !timeSlot) {
      const err = new Error('Please provide trainerId, className, date, and timeSlot');
      err.statusCode = 400;
      return next(err);
    }

    try {
      const booking = await ClassBooking.create({
        memberId,
        trainerId,
        className,
        date,
        timeSlot,
        status: 'booked'
      });

      const populatedBooking = await ClassBooking.findById(booking._id)
        .populate('memberId', 'name email')
        .populate('trainerId', 'name specialization');

      return res.status(201).json({
        success: true,
        message: 'Class booking created successfully',
        data: populatedBooking
      });
    } catch (dbErr) {
      // If db validation error occurs, pass to next(dbErr) for error handler
      if (dbErr.name === 'ValidationError' || dbErr.name === 'CastError') {
        return next(dbErr);
      }
      
      // Fallback in-memory creation if DB not connected
      const mockBooking = {
        _id: 'bk_' + Date.now(),
        memberId: { _id: memberId, name: req.member.name || 'Member', email: req.member.email },
        trainerId: { _id: trainerId, name: 'Assigned Trainer', specialization: 'Fitness Specialist' },
        className,
        date,
        timeSlot,
        status: 'booked',
        createdAt: new Date()
      };
      memoryBookings.push(mockBooking);

      return res.status(201).json({
        success: true,
        message: 'Class booking created successfully',
        data: mockBooking
      });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/v1/bookings/my
 * @desc    Return logged-in member's bookings with populated details
 * @access  Protected
 */
router.get('/my', async (req, res, next) => {
  try {
    const memberId = req.member.id;

    try {
      const bookings = await ClassBooking.find({ memberId })
        .populate('memberId', 'name email')
        .populate('trainerId', 'name specialization');

      return res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings
      });
    } catch (dbErr) {
      const userBookings = memoryBookings.filter(b => b.memberId._id === memberId || b.memberId === memberId);
      return res.status(200).json({
        success: true,
        count: userBookings.length,
        data: userBookings
      });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PATCH /api/v1/bookings/:id/status
 * @desc    Update booking status (booked | attended | cancelled)
 * @access  Protected
 */
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const validStatuses = ['booked', 'attended', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      const err = new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      err.statusCode = 400;
      return next(err);
    }

    try {
      const booking = await ClassBooking.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      ).populate('memberId', 'name email').populate('trainerId', 'name specialization');

      if (!booking) {
        const err = new Error('Booking not found');
        err.statusCode = 404;
        return next(err);
      }

      return res.status(200).json({
        success: true,
        message: 'Booking status updated successfully',
        data: booking
      });
    } catch (dbErr) {
      const memBk = memoryBookings.find(b => b._id === id);
      if (memBk) {
        memBk.status = status;
        return res.status(200).json({
          success: true,
          message: 'Booking status updated successfully',
          data: memBk
        });
      }

      return next(dbErr);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
