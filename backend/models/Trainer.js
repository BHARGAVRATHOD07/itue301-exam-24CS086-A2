const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Trainer name is required']
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required']
  },
  available: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Trainer', trainerSchema);
