import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import userRoles from '../../utils/userRoles';
import LostItemControllers from './lostItem.controller';
import LostValidations from './lostItem.validation';

const router = express.Router();

router.post(
	'/',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(LostValidations.ReportLostItem),
	LostItemControllers.reportLostItem
);

router.get('/', LostItemControllers.getLostItems);

router.get('/:lostItemId', LostItemControllers.getSingleLostItem);

router.get('/me', auth(userRoles.ADMIN, userRoles.USER), LostItemControllers.getMyLostItems);

router.put(
	'/:lostItemId',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(LostValidations.UpdateLostItem),
	LostItemControllers.updateLostItem
);

router.delete('/:lostItemId', auth(userRoles.ADMIN, userRoles.USER), LostItemControllers.deleteLostItem);

const LostItemRoutes = router;
export default LostItemRoutes;
