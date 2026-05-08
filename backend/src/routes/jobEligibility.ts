import { Router } from 'express';
import {
  checkJobEligibility,
  getJobPostings,
  getJobPostingById,
  createJobPosting
} from '../controllers/jobEligibilityController.js';

const router = Router();

router.get('/postings', getJobPostings);
router.get('/postings/:id', getJobPostingById);
router.post('/postings', createJobPosting);
router.post('/check-eligibility', checkJobEligibility);

export default router;
