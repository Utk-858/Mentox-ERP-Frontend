import mongoose from 'mongoose';
import config from './index';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.databaseURL);
    console.log('✅ Successfully connected to the MongoDB database.');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
