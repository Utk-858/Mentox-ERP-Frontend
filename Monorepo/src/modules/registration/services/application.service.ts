import { IStudentApplication } from '../controllers/registration.types';
import StudentApplicationModel from '../models/student.application.model';
import { uploadFile, deleteFile } from '../../../shared/utils/cloudinary.util';
import logger from '../../../shared/utils/logger';

// Interface for files object passed from Multer
interface IUploadedFiles {
  photo?: { path: string }[];
  aadharphoto?: { path: string }[];
  casteCertificate?: { path: string }[];
}

class ApplicationService {
  /**
   * Creates a new student application, handling file uploads.
   */
  public async create(applicationData: Partial<IStudentApplication>, files: IUploadedFiles): Promise<IStudentApplication> {
    logger.info({ studentName: applicationData.studentName }, 'Creating new student application');

    // Handle file uploads by calling the Cloudinary utility
    if (files?.photo?.[0]) {
      const result = await uploadFile(files.photo[0].path);
      if (result) applicationData.photo = result.secure_url;
    }
    if (files?.aadharphoto?.[0]) {
      const result = await uploadFile(files.aadharphoto[0].path);
      if (result) applicationData.aadharphoto = result.secure_url;
    }
    if (files?.casteCertificate?.[0]) {
      const result = await uploadFile(files.casteCertificate[0].path);
      if (result) applicationData.casteCertificate = result.secure_url;
    }

    const newApplication = new StudentApplicationModel(applicationData);
    await newApplication.save();

    logger.info({ applicationId: newApplication._id }, 'Student application created successfully');
    return newApplication;
  }

  /**
   * Retrieves all applications with filtering, pagination, and sorting.
   */
  public async getAll(query: any): Promise<any> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', ...filters } = query;
    logger.info({ filters, page, limit }, 'Fetching all student applications');
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort: { [key: string]: 'asc' | 'desc' } = { [sortBy]: sortOrder };

    const applications = await StudentApplicationModel.find(filters).sort(sort).skip(skip).limit(parseInt(limit));
    const total = await StudentApplicationModel.countDocuments(filters);

    return {
      data: applications,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    };
  }

  /**
   * Retrieves a single application by its ID.
   */
  public async getById(id: string): Promise<IStudentApplication | null> {
    logger.info({ applicationId: id }, 'Fetching student application by ID');
    return StudentApplicationModel.findById(id);
  }

  /**
   * Updates an existing student application.
   */
  public async update(id: string, updateData: Partial<IStudentApplication>, files: IUploadedFiles): Promise<IStudentApplication | null> {
    logger.info({ applicationId: id }, 'Updating student application');
    const existing = await StudentApplicationModel.findById(id);
    if (!existing) return null;

    // Handle file replacements
    if (files?.photo?.[0]) {
      if (existing.photo) await this.deleteCloudinaryFile(existing.photo);
      const result = await uploadFile(files.photo[0].path);
      if (result) updateData.photo = result.secure_url;
    }
    // ... similar logic for aadharphoto and casteCertificate ...

    return StudentApplicationModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  /**
   * Deletes a student application and its associated files.
   */
  public async delete(id: string): Promise<IStudentApplication | null> {
    logger.info({ applicationId: id }, 'Deleting student application');
    const application = await StudentApplicationModel.findByIdAndDelete(id);
    if (application) {
      if (application.photo) await this.deleteCloudinaryFile(application.photo);
      if (application.aadharphoto) await this.deleteCloudinaryFile(application.aadharphoto);
      if (application.casteCertificate) await this.deleteCloudinaryFile(application.casteCertificate);
    }
    return application;
  }

  /**
   * Updates only the status of an application.
   */
  public async updateStatus(id: string, status: 'Pending' | 'Approved' | 'Rejected'): Promise<IStudentApplication | null> {
    logger.info({ applicationId: id, newStatus: status }, 'Updating application status');
    return StudentApplicationModel.findByIdAndUpdate(id, { applicationStatus: status }, { new: true });
  }

  /**
   * Retrieves application statistics.
   */
  public async getStats(): Promise<any> {
    logger.info('Fetching application statistics');
    const total = await StudentApplicationModel.countDocuments();
    const pending = await StudentApplicationModel.countDocuments({ applicationStatus: 'Pending' });
    const approved = await StudentApplicationModel.countDocuments({ applicationStatus: 'Approved' });
    const rejected = await StudentApplicationModel.countDocuments({ applicationStatus: 'Rejected' });

    return { total, pending, approved, rejected };
  }

  /**
   * Helper to extract public_id and delete a file from a Cloudinary URL.
   */
  private async deleteCloudinaryFile(fileUrl: string): Promise<void> {
    try {
      const publicId = fileUrl.split('/').pop()?.split('.')[0];
      if (publicId) {
        await deleteFile(publicId);
      }
    } catch (error) {
      logger.error({ fileUrl, error }, 'Failed to delete file from Cloudinary during update/delete operation');
    }
  }
}

export default new ApplicationService();