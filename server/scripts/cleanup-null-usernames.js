const mongoose = require('mongoose');
const NguoiDung = require('../models/nguoidung');
require('dotenv').config();

const cleanupNullUsernames = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to MongoDB');
    
    // Find and delete records with null or empty tenDangNhap
    const result = await NguoiDung.deleteMany({
      $or: [
        { tenDangNhap: null },
        { tenDangNhap: '' },
        { tenDangNhap: { $exists: false } }
      ]
    });
    
    console.log(`Deleted ${result.deletedCount} records with null/empty tenDangNhap`);
    
    // Also check for records with ten_dang_nhap (snake_case) field
    const snakeCaseResult = await mongoose.connection.db.collection('nguoidungs').deleteMany({
      $or: [
        { ten_dang_nhap: null },
        { ten_dang_nhap: '' },
        { ten_dang_nhap: { $exists: false } }
      ]
    });
    
    console.log(`Deleted ${snakeCaseResult.deletedCount} records with null/empty ten_dang_nhap`);
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error during cleanup:', error);
    process.exit(1);
  }
};

cleanupNullUsernames(); 