const express = require('express');
const router = express.Router();
const { getPassengers, addPassenger, deletePassenger } = require('../controllers/passengerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getPassengers).post(protect, addPassenger);
router.route('/:id').delete(protect, deletePassenger);

module.exports = router;
