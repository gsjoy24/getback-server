import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import userRoles from '../../utils/userRoles';
import LostItemControllers from './lostItem.controller';
import LostValidations from './lostItem.validation';

const router = express.Router();

router.post(
	'/lost-items',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(LostValidations.ReportLostItem),
	LostItemControllers.reportLostItem
);

router.get('/lost-items', LostItemControllers.getLostItems);

router.get('/lost-items/:lostItemId', LostItemControllers.getSingleLostItem);

router.get('/my-lost-items', auth(userRoles.ADMIN, userRoles.USER), LostItemControllers.getMyLostItems);

router.patch(
	'/lost-items/:lostItemId',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(LostValidations.UpdateLostItem),
	LostItemControllers.updateLostItem
);

router.delete('/lost-items/:lostItemId', auth(userRoles.ADMIN, userRoles.USER), LostItemControllers.deleteLostItem);

const LostItemRoutes = router;
export default LostItemRoutes;
