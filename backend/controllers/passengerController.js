const Passenger = require('../models/Passenger');

// @desc    Get user's master passenger list
// @route   GET /api/passengers
// @access  Private
const getPassengers = async (req, res) => {
  try {
    const passengers = await Passenger.find({ user: req.user._id });
    res.json(passengers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a passenger to master list
// @route   POST /api/passengers
// @access  Private
const addPassenger = async (req, res) => {
  const { name, age, gender, aadhaarNumber } = req.body;
  // Basic mock hashing of aadhaar for simplicity
  const aadhaarHash = Buffer.from(aadhaarNumber).toString('base64');
  
  try {
    const passenger = await Passenger.create({
      user: req.user._id,
      name,
      age,
      gender,
      aadhaarHash
    });
    res.status(201).json(passenger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a passenger from master list
// @route   DELETE /api/passengers/:id
// @access  Private
const deletePassenger = async (req, res) => {
  try {
    const passenger = await Passenger.findById(req.params.id);
    if (passenger && passenger.user.toString() === req.user._id.toString()) {
      await passenger.deleteOne();
      res.json({ message: 'Passenger removed' });
    } else {
      res.status(404).json({ message: 'Passenger not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPassengers,
  addPassenger,
  deletePassenger
};
