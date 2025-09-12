import { Request, Response } from 'express';
import asyncHandler from '../../../shared/utils/asyncHandler';
import AdmissionService from '../services/admission.service';

class AdmissionController {
  public create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const newAdmission = await AdmissionService.createAdmission(req.body);
    res.status(201).json({ success: true, data: newAdmission });
  });

  public getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const admissions = await AdmissionService.getAllAdmissions();
    res.status(200).json({ success: true, data: admissions });
  });

  public getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const admission = await AdmissionService.getAdmissionById(req.params.id);
    if (!admission) {
      res.status(404).json({ success: false, message: 'Admission not found' });
      return;
    }
    res.status(200).json({ success: true, data: admission });
  });

  public update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const updatedAdmission = await AdmissionService.updateAdmission(req.params.id, req.body);
    if (!updatedAdmission) {
      res.status(404).json({ success: false, message: 'Admission not found' });
      return;
    }
    res.status(200).json({ success: true, data: updatedAdmission });
  });

  public delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const success = await AdmissionService.deleteAdmission(req.params.id);
    if (!success) {
      // This case is unlikely as the service throws an error, but it's good practice
      res.status(404).json({ success: false, message: 'Admission not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Admission deleted and application status reverted' });
  });
}

export default new AdmissionController();
