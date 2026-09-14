const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check if admin exists
    const adminExists = await User.findOne({ email: 'admin' });
    if (adminExists) {
      console.log('Admin user already exists!');
      process.exit();
    }
    
    // Create admin
    const admin = await User.create({
      name: 'Administrator',
      email: 'admin',
      password: 'password', // The user typed 8 chars in screenshot, let's say 'password'
      phone: '0000000000',
    });
    
    console.log('Admin user created successfully! email: admin, password: password');
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();
