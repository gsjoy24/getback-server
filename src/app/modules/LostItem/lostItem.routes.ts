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
	LostItemControllers.ReportLostItem
);

router.get('/lost-items', LostItemControllers.GetLostItems);

router.get('/lost-items/:lostItemId', LostItemControllers.GetSingleLostItem);

router.patch(
	'/lost-items/:lostItemId',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(LostValidations.UpdateLostItem),
	LostItemControllers.UpdateLostItem
);

router.delete('/lost-items/:lostItemId', auth(userRoles.ADMIN, userRoles.USER), LostItemControllers.DeleteLostItem);

const LostItemRoutes = router;
export default LostItemRoutes;
