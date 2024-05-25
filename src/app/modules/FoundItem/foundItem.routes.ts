import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import userRoles from '../../utils/userRoles';
import FoundItemControllers from './foundItem.controller';
import ReportItemValidations from './foundItem.validation';

const router = express.Router();

router.get('/found-items', FoundItemControllers.getFoundItems);

router.post(
	'/found-items',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(ReportItemValidations.ReportFoundItem),
	FoundItemControllers.ReportFoundItem
);

router.delete('/found-items/:id', auth(userRoles.ADMIN, userRoles.USER), FoundItemControllers.deleteFoundItem);

router.put(
	'/found-items/:id',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(ReportItemValidations.UpdateFoundItem),
	FoundItemControllers.updateFoundItem
);

const FoundItemRoutes = router;
export default FoundItemRoutes;
