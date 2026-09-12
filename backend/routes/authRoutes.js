const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyAadhaar } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-aadhaar', protect, verifyAadhaar);

module.exports = router;
