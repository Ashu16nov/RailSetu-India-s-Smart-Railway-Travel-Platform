const Booking = require('../models/Booking');
const Train = require('../models/Train');
const crypto = require('crypto');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const { trainId, journeyDate, source, destination, className, quota, passengers, totalFare } = req.body;

  try {
    // 1. One-Seat-per-Aadhaar Rule Check
    // Get all Aadhaar hashes of passengers in the current request
    const aadhaarHashes = passengers.map(p => p.aadhaarHash);
    
    // Check if any of these Aadhaar hashes already have a booking for this train and date
    const existingBookings = await Booking.find({
      train: trainId,
      journeyDate: new Date(journeyDate),
      status: { $in: ['CONFIRMED', 'WAITLISTED'] },
      "passengers.aadhaarHash": { $in: aadhaarHashes }
    });

    if (existingBookings.length > 0) {
      // Find which Aadhaar caused the conflict (for better error message)
      let conflictAadhaar = '';
      existingBookings.forEach(booking => {
        booking.passengers.forEach(p => {
          if (aadhaarHashes.includes(p.aadhaarHash)) conflictAadhaar = p.aadhaarHash;
        });
      });
      return res.status(400).json({ 
        message: 'One-Seat-per-Aadhaar rule violated. One or more passengers already have an active reservation for this train on this date.' 
      });
    }

    // 2. Aadhaar Verification Rule (especially for Tatkal)
    if (quota === 'TATKAL' && !req.user.isAadhaarVerified) {
      return res.status(403).json({ message: 'Aadhaar verification is required to book Tatkal tickets.' });
    }

    // 3. Create Booking (Simulate seat allocation)
    const pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString(); // Generate random 10-digit PNR

    const passengersWithSeats = passengers.map((p, i) => ({
      ...p,
      seatNumber: `${className}-${Math.floor(Math.random() * 50) + 1}`,
      status: 'CONFIRMED'
    }));

    const booking = await Booking.create({
      pnr,
      user: req.user._id,
      train: trainId,
      journeyDate,
      source,
      destination,
      className,
      quota,
      totalFare,
      passengers: passengersWithSeats,
      status: 'CONFIRMED'
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('train', 'name trainNumber').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel a booking
// @route   POST /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

    booking.status = 'CANCELED';
    booking.passengers.forEach(p => p.status = 'CANCELED');
    await booking.save();

    res.json({ message: 'Booking canceled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking
};
