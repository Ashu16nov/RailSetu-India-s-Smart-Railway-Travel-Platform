const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAadhaarVerified: user.isAadhaarVerified,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAadhaarVerified: user.isAadhaarVerified,
        aadhaarHash: user.aadhaarHash,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify Aadhaar
// @route   POST /api/auth/verify-aadhaar
// @access  Private
const verifyAadhaar = async (req, res) => {
  const { aadhaarNumber, otp } = req.body;
  // In a real scenario, we would call UIDAI APIs here.
  // We simulate it by checking if OTP is '123456'.
  
  if (otp === '123456') {
    try {
      const user = await User.findById(req.user._id);
      if (user) {
        // We only store a hash, simulating storing it securely. 
        // For simplicity, just storing a mock hash of the number.
        const mockHash = Buffer.from(aadhaarNumber).toString('base64');
        user.aadhaarHash = mockHash;
        user.isAadhaarVerified = true;
        await user.save();
        
        res.json({ message: 'Aadhaar verified successfully', isAadhaarVerified: true, aadhaarHash: mockHash });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyAadhaar
};
