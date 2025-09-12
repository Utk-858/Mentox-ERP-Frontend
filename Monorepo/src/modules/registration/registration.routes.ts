import { Router } from 'express';
import ApplicationController from './controllers/application.controller';
import AdmissionController from './controllers/admission.controller';
import HouseController from './controllers/house.controller';
import SectionController from './controllers/section.controller';
import TcController from './controllers/tc.controller';
import { upload } from '../../shared/middlewares/multer';
import validateRequest from '../../shared/middlewares/validateRequest';
import {
  createApplicationSchema,
  createAdmissionSchema,
  updateAdmissionSchema,
  createHouseSchema,
  updateHouseSchema,
  assignHousesToSectionSchema,
  createSectionSchema,
  manualAssignSectionSchema,
  autoAssignSectionSchema,
  createTcApplicationSchema,
} from './registration.validation';
import { applicationRateLimiter } from '../../shared/middlewares/authRateLimiter';

const router = Router();

// --- Student Application Routes ---
router.post(
  '/applications',
  applicationRateLimiter,
  validateRequest(createApplicationSchema),
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'aadharphoto', maxCount: 1 },
    { name: 'casteCertificate', maxCount: 1 },
  ]),
  ApplicationController.create
);
router.get('/applications', ApplicationController.getAll);
router.get('/applications/stats', ApplicationController.getStats);
router.get('/applications/:id', ApplicationController.getById);
router.patch(
  '/applications/:id',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'aadharphoto', maxCount: 1 },
    { name: 'casteCertificate', maxCount: 1 },
  ]),
  ApplicationController.update
);
router.delete('/applications/:id', ApplicationController.delete);
router.patch('/applications/:id/status', ApplicationController.updateStatus);

// --- Admission Routes ---
router.post('/admissions', validateRequest(createAdmissionSchema), AdmissionController.create);
router.get('/admissions', AdmissionController.getAll);
router.get('/admissions/:id', AdmissionController.getById);
router.patch('/admissions/:id', validateRequest(updateAdmissionSchema), AdmissionController.update);
router.delete('/admissions/:id', AdmissionController.delete);

// --- House Routes ---
router.post('/houses', validateRequest(createHouseSchema), HouseController.create);
router.get('/houses', HouseController.getAll);
router.get('/houses/distribution', HouseController.getDistribution);
router.put('/houses/auto-assign-all', HouseController.autoAssignAll);
router.put('/houses/auto-assign-section', validateRequest(assignHousesToSectionSchema), HouseController.autoAssignToSection);
router.get('/houses/:id', HouseController.getById);
router.patch('/houses/:id', validateRequest(updateHouseSchema), HouseController.update);
router.delete('/houses/:id', HouseController.delete);

// --- Section Routes ---
router.post('/sections', validateRequest(createSectionSchema), SectionController.create);
router.get('/sections', SectionController.getAll);
router.get('/sections/by-class', SectionController.getByClass);
router.get('/sections/:sectionId/students', SectionController.getStudentsInSection);
router.delete('/sections/:id', SectionController.delete);
router.post('/sections/assign-manual', validateRequest(manualAssignSectionSchema), SectionController.assignManually);
router.post('/sections/assign-auto', validateRequest(autoAssignSectionSchema), SectionController.autoAssign);

// --- Transfer Certificate (TC) Routes ---
router.post('/tc-applications', validateRequest(createTcApplicationSchema), TcController.createApplication);
router.get('/tc-applications/:id', TcController.getApplicationById);
router.patch('/tc-applications/:id/status', TcController.updateApplicationStatus);

router.post('/tc-formats', upload.single('file'), TcController.createFormat);
router.delete('/tc-formats/:id', TcController.deleteFormat);

router.post('/tc-generated', TcController.generateTc);
router.get('/tc-generated/:id', TcController.getGeneratedTcById);

export default router;