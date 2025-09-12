import mongoose from 'mongoose';
import { IAdmission } from '../controllers/registration.types';
import AdmissionModel from '../models/admission.model';
import StudentApplicationModel from '../models/student.application.model';
import CounterModel from '../models/counter.model';
import logger from '../../../shared/utils/logger';
import AuthService from '../../auth/auth.service'; 

class AdmissionService {
  /**
   * Creates a new admission record from an approved application.
   * This is a transactional operation that also creates a student user account.
   */
  public async createAdmission(data: { application: string; classEnrolled: string; academicYear: string }): Promise<IAdmission> {
    const { application, classEnrolled, academicYear } = data;
    logger.info({ applicationId: application }, 'Starting admission creation process');

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Validate the student application
      const app = await StudentApplicationModel.findById(application).session(session);
      if (!app) {
        throw new Error('Application not found');
      }
      if (app.applicationStatus === 'Approved') {
        throw new Error('This application has already been approved and an admission exists.');
      }

      // 2. Generate a new, unique admission number
      const counter = await CounterModel.findByIdAndUpdate(
        { _id: `admission-${academicYear}` },
        { $inc: { seq: 1 } },
        { new: true, upsert: true, session }
      );
      const admissionNumber = `ADM-${academicYear}-${String(counter.seq).padStart(4, '0')}`;
      logger.info({ admissionNumber }, 'Generated new admission number');

      // 3. Create and save the new admission record
      const admission = new AdmissionModel({
        application,
        classEnrolled,
        academicYear,
        admissionNumber,
      });
      await admission.save({ session });

      // 4. Update the application status to 'Approved'
      app.applicationStatus = 'Approved';
      await app.save({ session });

      // 5. CRITICAL: Create the student's user account via a direct service call
      // This replaces the old inter-service HTTP (axios) call.
      logger.info({ username: admissionNumber }, 'Creating student user account via AuthService');
      await AuthService.registerStudent({
        username: admissionNumber,
        password: admissionNumber, // Default password is the admission number
      });

      // 6. If all operations succeed, commit the transaction
      await session.commitTransaction();
      logger.info({ admissionId: admission._id, applicationId: application }, 'Admission created successfully and transaction committed.');

      return admission;
    } catch (error: any) {
      // If any step fails, abort the entire transaction
      await session.abortTransaction();
      logger.error({ error: error.message }, 'Admission creation failed, transaction aborted.');
      throw error; // Re-throw the error to be caught by the central error handler
    } finally {
      // End the session
      session.endSession();
    }
  }

  /**
   * Retrieves all admission records with populated data.
   */
  public async getAllAdmissions(): Promise<IAdmission[]> {
    logger.info('Fetching all admission records');
    return AdmissionModel.find().populate(['application', 'section', 'house']);
  }

  /**
   * Retrieves a single admission by its ID.
   */
  public async getAdmissionById(id: string): Promise<IAdmission | null> {
    logger.info({ admissionId: id }, 'Fetching admission by ID');
    return AdmissionModel.findById(id).populate(['application', 'section', 'house']);
  }

  /**
   * Updates an existing admission record.
   */
  public async updateAdmission(id: string, updateData: Partial<IAdmission>): Promise<IAdmission | null> {
    logger.info({ admissionId: id }, 'Updating admission record');
    return AdmissionModel.findByIdAndUpdate(id, updateData, { new: true });
  }

   /**
   * Deletes an admission record and reverts the parent application's status to 'Pending'.
   * This is a transactional operation.
   */
  public async deleteAdmission(id: string): Promise<boolean> {
    logger.info({ admissionId: id }, 'Starting admission deletion process');
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const admission = await AdmissionModel.findById(id).session(session);
      if (!admission) {
        throw new Error('Admission record not found');
      }

      // Revert the application status
      await StudentApplicationModel.findByIdAndUpdate(
        admission.application,
        { applicationStatus: 'Pending' },
        { session }
      );

      // Delete the admission record
      await admission.deleteOne({ session });

      await session.commitTransaction();
      logger.info({ admissionId: id }, 'Admission deleted successfully and transaction committed.');
      return true;
    } catch (error: any) {
      await session.abortTransaction();
      logger.error({ error: error.message, admissionId: id }, 'Admission deletion failed, transaction aborted.');
      throw error;
    } finally {
      session.endSession();
    }
  }

  
  
}

export default new AdmissionService();
