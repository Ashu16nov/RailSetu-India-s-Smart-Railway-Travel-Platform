const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  runsOn: [{ type: String }], // e.g., ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
  route: [{
    stationCode: { type: String, required: true },
    stationName: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    departureTime: { type: String, required: true },
    day: { type: Number, required: true }, // e.g. 1 for day 1, 2 for day 2
    distance: { type: Number, required: true }
  }],
  classes: [{
    className: { type: String, required: true }, // e.g., "1A", "2A", "3A", "SL", "CC"
    totalSeats: { type: Number, required: true },
    fare: { type: Number, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Train', trainSchema);
