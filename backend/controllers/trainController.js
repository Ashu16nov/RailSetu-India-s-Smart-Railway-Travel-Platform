const Train = require('../models/Train');

// @desc    Search trains
// @route   GET /api/trains/search
// @access  Public
const searchTrains = async (req, res) => {
  const { from, to, date } = req.query;
  try {
    // In a real app, date would filter availability. Here we just return trains matching the route.
    const trains = await Train.find({
      "route.stationCode": { $all: [from, to] }
    });

    // Filter trains where 'from' appears before 'to' in the route
    const validTrains = trains.filter(train => {
      const fromIndex = train.route.findIndex(s => s.stationCode === from);
      const toIndex = train.route.findIndex(s => s.stationCode === to);
      return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
    });

    res.json(validTrains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { searchTrains };
