import { Request, Response } from 'express';
import asyncHandler from '../../../shared/utils/asyncHandler';
import HouseService from '../services/house.service';

class HouseController {
  public create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const newHouse = await HouseService.createHouse(req.body);
    res.status(201).json({ success: true, data: newHouse });
  });

  public getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const houses = await HouseService.getAllHouses();
    res.status(200).json({ success: true, data: houses });
  });

  public getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const house = await HouseService.getHouseById(req.params.id);
    if (!house) {
      res.status(404).json({ success: false, message: 'House not found' });
      return;
    }
    res.status(200).json({ success: true, data: house });
  });

  public update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const updatedHouse = await HouseService.updateHouse(req.params.id, req.body);
    if (!updatedHouse) {
      res.status(404).json({ success: false, message: 'House not found' });
      return;
    }
    res.status(200).json({ success: true, data: updatedHouse });
  });

  public delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const success = await HouseService.deleteHouse(req.params.id);
    if (!success) {
      res.status(404).json({ success: false, message: 'House not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'House deleted and unassigned from students' });
  });

  public autoAssignAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await HouseService.autoAssignToAll();
    res.status(200).json({
      success: true,
      message: `${result.assignedCount} admissions were successfully assigned to houses.`,
      data: result,
    });
  });

  public autoAssignToSection = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await HouseService.autoAssignToSection(req.body);
    res.status(200).json({
      success: true,
      message: `${result.assignedCount} admissions in the specified section were assigned to houses.`,
      data: result,
    });
  });

  public getDistribution = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const distributionData = await HouseService.getDistribution();
    res.status(200).json({ success: true, data: distributionData });
  });
}

export default new HouseController();

