const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  pnr: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
  journeyDate: { type: Date, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  className: { type: String, required: true },
  quota: { type: String, enum: ['GENERAL', 'TATKAL', 'LADIES'], default: 'GENERAL' },
  status: { type: String, enum: ['CONFIRMED', 'WAITLISTED', 'CANCELED'], default: 'CONFIRMED' },
  totalFare: { type: Number, required: true },
  passengers: [{
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    aadhaarHash: { type: String, required: true },
    seatNumber: { type: String, required: true },
    status: { type: String, required: true }
  }]
}, { timestamps: true });

// Index to enforce one seat per Aadhaar rule efficiently
bookingSchema.index({ "train": 1, "journeyDate": 1, "passengers.aadhaarHash": 1 });

module.exports = mongoose.model('Booking', bookingSchema);
