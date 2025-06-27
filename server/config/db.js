export const connectDB = async (url) => {
  try {
        mongoose.connect('url')
  }catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}