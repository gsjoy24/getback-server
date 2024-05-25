import express from 'express';

import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import userRoles from '../../utils/userRoles';
import ClaimControllers from './claim.controller';
import ClaimValidations from './claim.validation';
const router = express.Router();

router.post(
	'/claims',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(ClaimValidations.createClaimSchema),
	ClaimControllers.claimItem
);
router.get('/claims', auth(userRoles.ADMIN, userRoles.USER), ClaimControllers.getClaims);
router.patch(
	'/claims/:claimId',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(ClaimValidations.updateClaimSchema),
	ClaimControllers.updateStatus
);

router.delete('/claims/:claimId', auth(userRoles.ADMIN, userRoles.USER), ClaimControllers.deleteClaim);

const ClaimRoutes = router;
export default ClaimRoutes;
