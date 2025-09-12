import { Request, Response } from 'express';
import asyncHandler from '../../../shared/utils/asyncHandler';
import SectionService from '../services/section.service';

class SectionController {
  public create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const newSection = await SectionService.createSection(req.body);
    res.status(201).json({ success: true, data: newSection });
  });

  public getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const sections = await SectionService.getAllSections();
    res.status(200).json({ success: true, data: sections });
  });

  public getByClass = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { class: classNumber, year } = req.query;
    const sections = await SectionService.getSectionsByClass(Number(classNumber), String(year));
    res.status(200).json({ success: true, data: sections });
  });
  
  public getStudentsInSection = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { sectionId } = req.params;
    const students = await SectionService.getStudentsInSection(sectionId);
    res.status(200).json({ success: true, data: students });
  });

  public delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const success = await SectionService.deleteSection(req.params.id);
    if (!success) {
      res.status(404).json({ success: false, message: 'Section not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Section deleted and unassigned from students' });
  });

  public assignManually = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { studentId, sectionId } = req.body;
    const updatedAdmission = await SectionService.assignManually(studentId, sectionId);
    res.status(200).json({ success: true, message: 'Section assigned manually', data: updatedAdmission });
  });

  public autoAssign = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { academicYear, classNumber } = req.body;
    const result = await SectionService.autoAssign(academicYear, classNumber);
    res.status(200).json({
      success: true,
      message: `Auto-assignment completed. ${result.assignedCount} students were assigned.`,
      data: result,
    });
  });
}

export default new SectionController();

