const mongoose = require('mongoose');

const classBookingSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: [true, 'Member ID reference is required']
  },
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: [true, 'Trainer ID reference is required']
  },
  className: {
    type: String,
    required: [true, 'Class name is required']
  },
  date: {
    type: String,
    required: [true, 'Booking date is required']
  },
  timeSlot: {
    type: String,
    required: [true, 'Time slot is required']
  },
  status: {
    type: String,
    enum: {
      values: ['booked', 'attended', 'cancelled'],
      message: '{VALUE} is not a valid booking status (must be booked, attended, or cancelled)'
    },
    default: 'booked'
  }
}, { timestamps: true });

module.exports = mongoose.model('ClassBooking', classBookingSchema);
