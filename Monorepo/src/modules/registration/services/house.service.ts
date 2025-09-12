import { IAdmission, IHouse } from '../controllers/registration.types';
import AdmissionModel from '../models/admission.model';
import HouseModel from '../models/house.model';
import logger from '../../../shared/utils/logger';

class HouseService {
  // --- House CRUD Operations ---

  public async createHouse(data: { name: string; colorAssociated?: string }): Promise<IHouse> {
    logger.info({ houseName: data.name }, 'Creating a new house');
    const house = await HouseModel.create(data);
    return house;
  }

  public async getAllHouses(): Promise<IHouse[]> {
    logger.info('Fetching all houses');
    return HouseModel.find();
  }

  public async getHouseById(id: string): Promise<IHouse | null> {
    logger.info({ houseId: id }, 'Fetching house by ID');
    return HouseModel.findById(id);
  }

  public async updateHouse(id: string, updateData: Partial<IHouse>): Promise<IHouse | null> {
    logger.info({ houseId: id }, 'Updating house');
    return HouseModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  public async deleteHouse(id: string): Promise<boolean> {
    logger.info({ houseId: id }, 'Starting house deletion process');
    // First, unset the house from all admissions that reference it
    await AdmissionModel.updateMany({ house: id }, { $unset: { house: "" } });
    
    // Then, delete the house document
    const result = await HouseModel.findByIdAndDelete(id);
    return !!result; // Return true if a document was found and deleted
  }

  // --- Business Logic Operations ---
  
  /**
   * Auto-assigns houses to unassigned students within a specific section.
   */
  public async autoAssignToSection(filters: { section: string; classEnrolled?: string; academicYear?: string }): Promise<{ assignedCount: number }> {
    logger.info({ filters }, 'Starting auto-assignment of houses for a specific section.');

    const unassignedAdmissions = await AdmissionModel.find({ ...filters, house: { $exists: false } }).sort({ admissionNumber: 1 });
    if (unassignedAdmissions.length === 0) {
      logger.info({ filters }, 'No unassigned admissions found for the specified section.');
      return { assignedCount: 0 };
    }
    
    const houses = await HouseModel.find({});
    if (houses.length === 0) {
      throw new Error('No houses found in the database. Cannot perform auto-assignment.');
    }

    const operations = unassignedAdmissions.map((admission) => {
      const sequence = this.getSequenceFromAdmissionNumber(admission.admissionNumber);
      if (sequence === null) return null;

      const houseIndex = (sequence - 1) % houses.length;
      return {
        updateOne: {
          filter: { _id: admission._id },
          update: { $set: { house: houses[houseIndex]._id } },
        },
      };
    }).filter(op => op !== null);

    if (operations.length > 0) {
      await AdmissionModel.bulkWrite(operations as any);
    }
    return { assignedCount: operations.length };
  }


  public async autoAssignToAll(): Promise<{ assignedCount: number }> {
    logger.info('Starting auto-assignment of houses for all unassigned admissions.');

    const unassignedAdmissions = await AdmissionModel.find({ house: { $exists: false } }).sort({ admissionNumber: 1 });
    if (unassignedAdmissions.length === 0) {
      logger.info('No unassigned admissions found.');
      return { assignedCount: 0 };
    }

    const houses = await HouseModel.find({});
    if (houses.length === 0) {
      throw new Error('No houses found in the database. Cannot perform auto-assignment.');
    }

    const operations = unassignedAdmissions.map((admission) => {
      const sequence = this.getSequenceFromAdmissionNumber(admission.admissionNumber);
      if (sequence === null) return null; // Skip invalid admission numbers

      const houseIndex = (sequence - 1) % houses.length;
      const assignedHouseId = houses[houseIndex]._id;

      return {
        updateOne: {
          filter: { _id: admission._id },
          update: { $set: { house: assignedHouseId } },
        },
      };
    }).filter(op => op !== null); // Filter out any null operations

    if (operations.length > 0) {
      await AdmissionModel.bulkWrite(operations as any);
      logger.info(`Successfully performed bulk update for ${operations.length} admissions.`);
    }

    return { assignedCount: operations.length };
  }
  
  public async getDistribution(): Promise<any> {
    logger.info('Calculating house distribution.');
    const distribution = await AdmissionModel.aggregate([
      { $match: { house: { $exists: true } } },
      { $group: { _id: '$house', count: { $sum: 1 } } },
      {
        $lookup: {
          from: 'houses', // The actual collection name for the HouseModel
          localField: '_id',
          foreignField: '_id',
          as: 'houseDetails'
        }
      },
      { $unwind: '$houseDetails' },
      {
        $project: {
          _id: 0,
          houseId: '$_id',
          houseName: '$houseDetails.name',
          count: '$count'
        }
      }
    ]);
    
    const totalAssigned = distribution.reduce((sum, item) => sum + item.count, 0);
    const totalAdmissions = await AdmissionModel.countDocuments();
    
    return {
        distribution,
        unassigned: totalAdmissions - totalAssigned,
    };
  }

  private getSequenceFromAdmissionNumber(admissionNumber: string): number | null {
    try {
      const parts = admissionNumber.split('-');
      if (parts.length < 3) return null;
      const sequence = parseInt(parts[2], 10);
      return isNaN(sequence) ? null : sequence;
    } catch (error) {
      logger.warn({ admissionNumber }, 'Could not parse sequence from admission number');
      return null;
    }
  }
}

export default new HouseService();

