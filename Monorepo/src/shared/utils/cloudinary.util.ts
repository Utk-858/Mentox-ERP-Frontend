import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import config from '../../config';
import logger from './logger';

// Configure Cloudinary with credentials from our central config
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

/**
 * Uploads a file from a local path to Cloudinary.
 * @param {string} localFilePath - The path to the local file to upload.
 * @returns {Promise<object | null>} The Cloudinary upload response or null on failure.
 */
export const uploadFile = async (localFilePath: string): Promise<any | null> => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    // File has been successfully uploaded, now remove the local temporary file
    fs.unlinkSync(localFilePath);
    return response;
  } catch (err: any) {
    logger.error({ error: err, path: localFilePath }, 'Cloudinary upload failed');
    // Attempt to remove the local file even if the upload failed
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

/**
 * Deletes a file from Cloudinary using its public ID.
 * @param {string} publicId - The public ID of the file to delete.
 * @returns {Promise<object | null>} The Cloudinary deletion response or null on failure.
 */
export const deleteFile = async (publicId: string): Promise<any | null> => {
  try {
    if (!publicId) return null;
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (err: any) {
    logger.error({ error: err, publicId }, 'Cloudinary deletion failed');
    return null;
  }
};
