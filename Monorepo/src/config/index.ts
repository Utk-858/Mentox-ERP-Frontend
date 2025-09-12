import dotenv from 'dotenv';
import path from 'path';

// Load .env file from the root directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Helper function to safely get environment variables
const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`FATAL ERROR: Missing required environment variable: ${key}`);
  }
  return value;
};

// Centralized configuration object
const config = {
  port: parseInt(getEnv('PORT', '5001'), 10),
  databaseURL: getEnv('MONGO_URI'),
  jwt: {
    accessTokenSecret: getEnv('JWT_SECRET'),
    refreshTokenSecret: getEnv('REFRESH_TOKEN_SECRET'),
    accessTokenExpiresIn: '15m',
    refreshTokenExpiresIn: '7d',
  },
  cors: {
    origin: getEnv('CLIENT_ORIGIN'),
  },
  // NEW: Added Cloudinary configuration
  cloudinary: {
    cloudName: getEnv('CLOUDINARY_CLOUD_NAME'),
    apiKey: getEnv('CLOUDINARY_API_KEY'),
    apiSecret: getEnv('CLOUDINARY_API_SECRET'),
  },
};

// Validate that all necessary environment variables are loaded on startup
try {
  getEnv('PORT');
  getEnv('MONGO_URI');
  getEnv('JWT_SECRET');
  getEnv('REFRESH_TOKEN_SECRET');
  getEnv('CLIENT_ORIGIN');
  getEnv('CLOUDINARY_CLOUD_NAME');
  getEnv('CLOUDINARY_API_KEY');
  getEnv('CLOUDINARY_API_SECRET');
} catch (error: any) {
  // Use a logger if available, otherwise console.error
  console.error(`Configuration validation error: ${error.message}`);
  process.exit(1); // Exit if critical configuration is missing
}

export default config;

