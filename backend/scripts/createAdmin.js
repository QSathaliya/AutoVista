const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' });

// Ensure we're connecting to the right database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/AutoVista';

// Admin user data
const adminData = {
  email: 'qusaisathaliya12345@gmail.com',
  username: 'QusaiSathaliya',
  password: 'Qusai@7567',
  role: 'admin'
};

async function createAdmin() {
  let connection;
  try {
    console.log('Connecting to MongoDB at:', MONGODB_URI);
    connection = await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      console.log('Admin user already exists with email:', adminData.email);
      console.log('Current admin details:', {
        id: existingAdmin._id,
        username: existingAdmin.username,
        email: existingAdmin.email,
        role: existingAdmin.role
      });
      
      // Update admin role if needed
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('Admin role updated');
      }
      
      // Update admin details and password
      if (!existingAdmin.username) {
        existingAdmin.username = adminData.username;
        console.log('Added missing username field');
      }
      
      const salt = await bcrypt.genSalt(10);
      existingAdmin.password = await bcrypt.hash(adminData.password, salt);
      await existingAdmin.save();
      console.log('Admin password updated');
      
      return;
    }

    // Create new admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);
    
    const admin = new User({
      ...adminData,
      password: hashedPassword
    });
    
    await admin.save();
    
    console.log('Admin user created successfully with email:', adminData.email);
    console.log('Admin details:', {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role
    });
    
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    if (connection) {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  }
}

createAdmin();
