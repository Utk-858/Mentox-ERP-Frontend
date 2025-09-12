import pino from 'pino';
import fs from 'fs';
import path from 'path';

// Define the path for the log directory
const logDir = path.join(__dirname, '../../../logs');

// Ensure the log directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Define the transport for development (pretty printing to console)
const devTransport = {
  target: 'pino-pretty',
  options: {
    colorize: true,
    translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
    ignore: 'pid,hostname',
  },
};

// Define the transport for production (writing to a file)
const prodTransport = {
  target: 'pino/file',
  options: {
    destination: `${logDir}/app.log`, // Log file path
    mkdir: true, // Create the directory if it doesn't exist
  },
};

/**
 * Creates a centralized, structured logger for the application.
 * - In development, it uses 'pino-pretty' for human-readable console logs.
 * - In production, it writes structured JSON logs to a file in the 'logs' directory.
 */
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  // Use the appropriate transport based on the environment
  transport: process.env.NODE_ENV !== 'production' ? devTransport : prodTransport,
});

export default logger;

