const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  aadhaarHash: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Passenger', passengerSchema);
