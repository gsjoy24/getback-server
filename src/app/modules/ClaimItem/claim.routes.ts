import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import userRoles from '../../utils/userRoles';
import ClaimControllers from './claim.controller';
import ClaimValidations from './claim.validation';
const router = express.Router();

router.post(
	'/',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(ClaimValidations.createClaimSchema),
	ClaimControllers.claimItem
);

router.get('/', auth(userRoles.ADMIN, userRoles.USER), ClaimControllers.getClaims);

router.get('/:claimId', auth(userRoles.ADMIN, userRoles.USER), ClaimControllers.getClaim);

router.get('/me', auth(userRoles.ADMIN, userRoles.USER), ClaimControllers.getMyClaims);

router.put(
	'/:claimId',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(ClaimValidations.updateClaimSchema),
	ClaimControllers.updateClaim
);

router.put(
	'/status/:claimId',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(ClaimValidations.updateClaimStatus),
	ClaimControllers.updateStatus
);

router.delete('/:claimId', auth(userRoles.ADMIN, userRoles.USER), ClaimControllers.deleteClaim);

const ClaimRoutes = router;
export default ClaimRoutes;
