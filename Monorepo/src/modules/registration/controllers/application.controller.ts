import { Request, Response } from 'express';
import asyncHandler from '../../../shared/utils/asyncHandler';
import ApplicationService from '../services/application.service';
import { IStudentApplication } from './registration.types';

// This interface can remain as a reference for the shape of the request with files
interface IRequestWithFiles extends Request {
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
}

class ApplicationController {
  // FIX: Changed 'req: IRequestWithFiles' to 'req: Request' to match asyncHandler's expectation.
  // We now cast 'req' to 'IRequestWithFiles' inside the function where 'files' is accessed.
  public create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const applicationData: Partial<IStudentApplication> = req.body;
    const { files } = req as IRequestWithFiles; // Type assertion
    
    // Attach parentID if the user is a Parent
    if (req.user?.role === 'Parents') {
      applicationData.parentID = req.user._id;
    }
    
    const newApplication = await ApplicationService.create(applicationData, files || {});
    res.status(201).json({ success: true, data: newApplication });
  });

  public getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await ApplicationService.getAll(req.query);
    res.status(200).json({ success: true, ...result });
  });

  public getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const application = await ApplicationService.getById(req.params.id);
    if (!application) {
      res.status(404).json({ success: false, message: 'Application not found' });
      return;
    }
    res.status(200).json({ success: true, data: application });
  });

  // FIX: Applied the same fix here for the 'update' method.
  public update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { files } = req as IRequestWithFiles; // Type assertion
    const updatedApplication = await ApplicationService.update(req.params.id, req.body, files || {});
    if (!updatedApplication) {
      res.status(404).json({ success: false, message: 'Application not found' });
      return;
    }
    res.status(200).json({ success: true, data: updatedApplication });
  });

  public delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const deletedApplication = await ApplicationService.delete(req.params.id);
    if (!deletedApplication) {
      res.status(404).json({ success: false, message: 'Application not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Application deleted successfully' });
  });

  public updateStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { status } = req.body;
    const updatedApplication = await ApplicationService.updateStatus(req.params.id, status);
    if (!updatedApplication) {
      res.status(404).json({ success: false, message: 'Application not found' });
      return;
    }
    res.status(200).json({ success: true, data: updatedApplication });
  });

  public getStats = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const stats = await ApplicationService.getStats();
    res.status(200).json({ success: true, data: stats });
  });
}

export default new ApplicationController();

