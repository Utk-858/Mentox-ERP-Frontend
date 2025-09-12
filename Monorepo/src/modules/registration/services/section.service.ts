import { IAdmission, ISection } from '../controllers/registration.types';
import AdmissionModel from '../models/admission.model';
import SectionModel from '../models/section.model';
import logger from '../../../shared/utils/logger';

class SectionService {
  // --- Section CRUD Operations ---

  public async createSection(data: Partial<ISection>): Promise<ISection> {
    logger.info({ sectionName: data.name, class: data.class }, 'Creating a new section');
    const section = await SectionModel.create(data);
    return section;
  }

  public async getAllSections(): Promise<ISection[]> {
    logger.info('Fetching all sections');
    return SectionModel.find();
  }
  
  public async getSectionsByClass(classNumber: number, academicYear: string): Promise<ISection[]> {
    logger.info({ class: classNumber, academicYear }, 'Fetching sections by class and year');
    return SectionModel.find({ class: classNumber, academicYear });
  }

  public async deleteSection(id: string): Promise<boolean> {
    logger.info({ sectionId: id }, 'Starting section deletion process');
    
    // First, unassign this section from all students (admissions)
    await AdmissionModel.updateMany({ section: id }, { $unset: { section: "" } });
    
    // Then, delete the section itself
    const result = await SectionModel.findByIdAndDelete(id);
    return !!result; // Will be true if a document was deleted, false otherwise
  }
  
  public async getStudentsInSection(sectionId: string): Promise<IAdmission[]> {
    logger.info({ sectionId }, 'Fetching all students in a section');
    return AdmissionModel.find({ section: sectionId }).populate('application');
  }

  // --- Business Logic Operations ---

  public async assignManually(studentId: string, sectionId: string): Promise<any> {
    logger.info({ studentId, sectionId }, 'Attempting to manually assign section');

    const section = await SectionModel.findById(sectionId);
    if (!section) {
      throw new Error('Section not found');
    }

    // Check section capacity
    if (section.capacity != null) {
      const assignedCount = await AdmissionModel.countDocuments({ section: section._id });
      if (assignedCount >= section.capacity) {
        logger.warn({ sectionId, capacity: section.capacity }, 'Section capacity is full');
        throw new Error('Section capacity is full');
      }
    }

    const updatedAdmission = await AdmissionModel.findByIdAndUpdate(
      studentId,
      { section: section._id },
      { new: true }
    ).populate('section');

    if (!updatedAdmission) {
      throw new Error('Student admission record not found');
    }

    logger.info({ studentId, sectionId }, 'Successfully assigned student to section manually');
    return updatedAdmission;
  }

  public async autoAssign(academicYear: string, classNumber: number): Promise<{ assignedCount: number }> {
    logger.info({ academicYear, classNumber }, 'Starting auto-assignment of sections');

    const sections = await SectionModel.find({ academicYear, class: classNumber });
    if (sections.length === 0) {
      throw new Error('No sections found for the specified class and academic year.');
    }

    const students = await AdmissionModel.find({
      academicYear,
      classEnrolled: `${classNumber}${this.getOrdinalSuffix(classNumber)}`,
      section: { $exists: false },
    });

    if (students.length === 0) {
      logger.info('No unassigned students found for auto-assignment.');
      return { assignedCount: 0 };
    }

    let sectionIndex = 0;
    let assignedCount = 0;
    const operations = [];

    for (const student of students) {
      let assigned = false;
      for (let i = 0; i < sections.length; i++) {
        const currentSection = sections[sectionIndex % sections.length];
        const count = await AdmissionModel.countDocuments({ section: currentSection._id });

        if (currentSection.capacity == null || count < currentSection.capacity) {
          operations.push({
            updateOne: {
              filter: { _id: student._id },
              update: { $set: { section: currentSection._id } },
            },
          });
          assignedCount++;
          sectionIndex++;
          assigned = true;
          break; // Move to the next student
        }
        sectionIndex++; // Try the next section
      }
      if (!assigned) {
        logger.warn({ studentId: student._id }, 'Could not assign student, all sections might be full.');
      }
    }

    if (operations.length > 0) {
      await AdmissionModel.bulkWrite(operations as any);
      logger.info(`Bulk assigned ${assignedCount} students to sections.`);
    }

    return { assignedCount };
  }

  private getOrdinalSuffix = (num: number): string => {
    if (num === 11 || num === 12 || num === 13) return 'th';
    const lastDigit = num % 10;
    switch (lastDigit) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
}

export default new SectionService();

