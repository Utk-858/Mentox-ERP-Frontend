import { ITCApplication, ITCFormat, ITCGenerated } from '../controllers/registration.types';
import TCApplicationModel from '../models/tc.application.model';
import TCFormatModel from '../models/tc.format.model';
import TCGeneratedModel from '../models/generated.tc.model';
import AdmissionModel from '../models/admission.model';
import { uploadFile, deleteFile } from '../../../shared/utils/cloudinary.util';
import logger from '../../../shared/utils/logger';

class TcService {
  // --- TC Application ---

  public async createTcApplication(data: { admission: string; reasonForLeaving: string }): Promise<ITCApplication> {
    logger.info({ admissionId: data.admission }, 'Creating new TC Application');
    const { admission, reasonForLeaving } = data;

    const existingAdmission = await AdmissionModel.findById(admission);
    if (!existingAdmission) throw new Error('Admission record not found');

    const existingApp = await TCApplicationModel.findOne({ admission });
    if (existingApp) throw new Error('TC application has already been submitted for this admission');

    return TCApplicationModel.create({ admission, reasonForLeaving });
  }

  public async getAllTcApplications(status?: 'Pending' | 'Approved' | 'Rejected'): Promise<ITCApplication[]> {
    const filter = status ? { status } : {};
    logger.info({ filter }, 'Fetching all TC Applications');
    return TCApplicationModel.find(filter).populate('admission');
  }

  public async getTcApplicationById(id: string): Promise<ITCApplication | null> {
    logger.info({ tcApplicationId: id }, 'Fetching TC Application by ID');
    return TCApplicationModel.findById(id).populate('admission');
  }

  public async updateTcApplicationStatus(id: string, status: 'Pending' | 'Approved' | 'Rejected'): Promise<ITCApplication | null> {
    logger.info({ tcApplicationId: id, status }, 'Updating TC Application status');
    return TCApplicationModel.findByIdAndUpdate(id, { status }, { new: true });
  }

  // --- TC Format ---

  public async createTcFormat(file: { path: string }): Promise<ITCFormat> {
    logger.info('Creating new TC Format');
    const result = await uploadFile(file.path);
    if (!result || !result.secure_url || !result.public_id) {
      throw new Error('File upload to Cloudinary failed');
    }
    return TCFormatModel.create({
      content: result.secure_url,
      public_id: result.public_id,
    });
  }
  
  public async getAllTcFormats(): Promise<ITCFormat[]> {
    logger.info('Fetching all TC Formats');
    return TCFormatModel.find();
  }
  
  public async getTcFormatById(id: string): Promise<ITCFormat | null> {
    logger.info({ tcFormatId: id }, 'Fetching TC Format by ID');
    return TCFormatModel.findById(id);
  }

  public async updateTcFormat(id: string, file?: { path: string }): Promise<ITCFormat | null> {
    logger.info({ tcFormatId: id }, 'Updating TC Format');
    const existingFormat = await TCFormatModel.findById(id);
    if (!existingFormat) return null;

    if (file) {
      if (existingFormat.public_id) {
        await deleteFile(existingFormat.public_id);
      }
      const result = await uploadFile(file.path);
      if (!result) throw new Error('New file upload to Cloudinary failed');
      existingFormat.content = result.secure_url;
      existingFormat.public_id = result.public_id;
    }
    
    await existingFormat.save();
    return existingFormat;
  }

  public async deleteTcFormat(id: string): Promise<ITCFormat | null> {
    logger.info({ tcFormatId: id }, 'Deleting TC Format');
    const format = await TCFormatModel.findByIdAndDelete(id);
    if (format && format.public_id) {
      await deleteFile(format.public_id);
    }
    return format;
  }
  
  // --- Generated TC ---

  public async generateTc(data: Partial<ITCGenerated>): Promise<ITCGenerated> {
    logger.info({ tcApplicationId: data.tcApplication }, 'Generating new TC');
    const { tcApplication } = data;

    const application = await TCApplicationModel.findById(tcApplication);
    if (!application) throw new Error('TC Application not found');
    if (application.status !== 'Approved') throw new Error('Cannot generate TC until application is approved');

    const existingTc = await TCGeneratedModel.findOne({ tcApplication });
    if (existingTc) throw new Error('TC has already been issued for this application');

    return TCGeneratedModel.create(data);
  }
  
  public async getAllGeneratedTcs(): Promise<ITCGenerated[]> {
    logger.info('Fetching all generated TCs');
    return TCGeneratedModel.find().populate({
      path: 'tcApplication',
      populate: { path: 'admission' },
    });
  }

  public async getGeneratedTcById(id: string): Promise<ITCGenerated | null> {
    logger.info({ generatedTcId: id }, 'Fetching Generated TC by ID');
    return TCGeneratedModel.findById(id).populate({
      path: 'tcApplication',
      populate: { path: 'admission' },
    });
  }
}

export default new TcService();

