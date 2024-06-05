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

router.get('/claims/:claimId', auth(userRoles.ADMIN, userRoles.USER), ClaimControllers.getClaim);

router.get('/my-claims', auth(userRoles.ADMIN, userRoles.USER), ClaimControllers.getMyClaims);

router.put(
	'/claims/:claimId',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(ClaimValidations.updateClaimSchema),
	ClaimControllers.updateClaim
);

router.put(
	'/claims/status/:claimId',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(ClaimValidations.updateClaimStatus),
	ClaimControllers.updateStatus
);

router.delete('/claims/:claimId', auth(userRoles.ADMIN, userRoles.USER), ClaimControllers.deleteClaim);

const ClaimRoutes = router;
export default ClaimRoutes;
