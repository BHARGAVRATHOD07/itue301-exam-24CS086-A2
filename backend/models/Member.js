const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Member name is required']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  membershipType: {
    type: String,
    enum: {
      values: ['basic', 'premium', 'platinum'],
      message: '{VALUE} is not a valid membershipType (must be basic, premium, or platinum)'
    },
    default: 'basic'
  }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
