import { Router } from 'express';
import {
  getApplications,
  getApplicationById,
  createApplication,
  uploadIncomeProof,
  scheduleAppointment,
  reviewCaseNotes,
  updateApplicationStatus,
  deleteApplication
} from '../controllers/applicationController.js';

const router = Router();

router.get('/', getApplications);
router.get('/:id', getApplicationById);
router.post('/', createApplication);
router.post('/:id/upload-income-proof', uploadIncomeProof);
router.post('/:id/schedule-appointment', scheduleAppointment);
router.post('/:id/review-case-notes', reviewCaseNotes);
router.patch('/:id/status', updateApplicationStatus);
router.delete('/:id', deleteApplication);

export default router;
