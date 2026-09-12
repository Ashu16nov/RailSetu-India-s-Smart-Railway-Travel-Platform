const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Complaint = require('../models/Complaint');

// Get Booking by PNR (For PNR Status page)
// We treat the Booking _id as the PNR for simplicity, or we can use substring
router.get('/pnr/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('train')
      .populate('passengers.passengerId');
      
    if (!booking) {
      return res.status(404).json({ message: 'PNR not found or invalid' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit a RailMadad Complaint
router.post('/complaint', async (req, res) => {
  try {
    const { pnr, category, description } = req.body;
    
    // In a real app we'd verify the PNR exists first
    const complaint = await Complaint.create({
      pnr,
      category,
      description
    });
    
    res.status(201).json({ message: 'Complaint registered successfully', referenceId: complaint._id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit complaint' });
  }
});

// Mock Food Order
router.post('/food', async (req, res) => {
  try {
    // Just mock it
    res.status(200).json({ message: 'Food order confirmed' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to book food' });
  }
});

module.exports = router;
