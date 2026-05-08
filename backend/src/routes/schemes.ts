import { Router } from 'express';
import { checkEligibility, getSchemes, filterSchemesForUser, simplifySchemeDocument } from '../controllers/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(getSchemes));
router.post('/filter', asyncHandler(filterSchemesForUser));
router.post('/check-eligibility', asyncHandler(checkEligibility));
router.post('/simplify', asyncHandler(simplifySchemeDocument));

export default router;
