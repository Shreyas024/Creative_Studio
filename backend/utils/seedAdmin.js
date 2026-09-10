/**
 * Admin Seed Script
 * Creates the admin account directly in the database.
 * Usage: npm run seed:admin
 * 
 * The admin email and password will be configured by the owner.
 * This is the ONLY way to create an admin account — 
 * there is no public API endpoint for admin registration.
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@creativestudios.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Creative Studios Admin';

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📿 Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('⚠️  Admin account already exists with this email.');
      console.log(`   Email: ${ADMIN_EMAIL}`);
      console.log(`   Role: ${existingAdmin.role}`);
      process.exit(0);
    }

    // Create admin user — password will be hashed by the pre-save hook
    const admin = await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin',
      isActive: true,
    });

    console.log('✅ Admin account created successfully!');
    console.log(`   Name: ${admin.name}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);
    console.log('\n🔒 Remember to change the default password in .env');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
