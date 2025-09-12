import { Request, Response } from 'express';
import asyncHandler from '../../../shared/utils/asyncHandler';
import TcService from '../services/tc.service';

interface IRequestWithFile extends Request {
  file?: Express.Multer.File;
}

class TcController {
  // --- TC Application Methods ---

  public createApplication = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const application = await TcService.createTcApplication(req.body);
    res.status(201).json({ success: true, data: application });
  });
  
  public getAllApplications = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const status = req.query.status as 'Pending' | 'Approved' | 'Rejected' | undefined;
    const applications = await TcService.getAllTcApplications(status);
    res.status(200).json({ success: true, data: applications });
  });

  public getApplicationById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const application = await TcService.getTcApplicationById(req.params.id);
    if (!application) {
      res.status(404).json({ success: false, message: 'TC Application not found' });
      return;
    }
    res.status(200).json({ success: true, data: application });
  });

  public updateApplicationStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { status } = req.body;
    const application = await TcService.updateTcApplicationStatus(req.params.id, status);
    if (!application) {
      res.status(404).json({ success: false, message: 'TC Application not found' });
      return;
    }
    res.status(200).json({ success: true, data: application });
  });

  // --- TC Format Methods ---

  public createFormat = asyncHandler(async (req: IRequestWithFile, res: Response): Promise<void> => {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }
    const format = await TcService.createTcFormat(req.file);
    res.status(201).json({ success: true, data: format });
  });
  
  public getAllFormats = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const formats = await TcService.getAllTcFormats();
    res.status(200).json({ success: true, data: formats });
  });
  
  public getFormatById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const format = await TcService.getTcFormatById(req.params.id);
    if (!format) {
      res.status(404).json({ success: false, message: 'TC Format not found' });
      return;
    }
    res.status(200).json({ success: true, data: format });
  });

  public updateFormat = asyncHandler(async (req: IRequestWithFile, res: Response): Promise<void> => {
    const format = await TcService.updateTcFormat(req.params.id, req.file);
    if (!format) {
      res.status(404).json({ success: false, message: 'TC Format not found' });
      return;
    }
    res.status(200).json({ success: true, data: format });
  });

  public deleteFormat = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const format = await TcService.deleteTcFormat(req.params.id);
    if (!format) {
      res.status(404).json({ success: false, message: 'TC Format not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'TC Format deleted successfully' });
  });

  // --- Generated TC Methods ---

  public generateTc = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const generatedTc = await TcService.generateTc(req.body);
    res.status(201).json({ success: true, data: generatedTc });
  });
  
  public getAllGeneratedTcs = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const tcs = await TcService.getAllGeneratedTcs();
    res.status(200).json({ success: true, data: tcs });
  });

  public getGeneratedTcById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const generatedTc = await TcService.getGeneratedTcById(req.params.id);
    if (!generatedTc) {
      res.status(404).json({ success: false, message: 'Generated TC not found' });
      return;
    }
    res.status(200).json({ success: true, data: generatedTc });
  });
}

export default new TcController();

