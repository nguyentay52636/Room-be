const mongoose = require('mongoose');
const connectDB = async (url) => {
  try {
         await mongoose.connect('url')
  }catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
module.exports = connectDB;