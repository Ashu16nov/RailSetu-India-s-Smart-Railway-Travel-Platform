const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow anonymous if needed, but usually linked
  },
  pnr: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Medical', 'Security', 'Cleanliness', 'Catering', 'Staff Behavior', 'Other']
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Open',
    enum: ['Open', 'In Progress', 'Resolved']
  }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
