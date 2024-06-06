import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import userRoles from '../../utils/userRoles';
import FoundItemControllers from './foundItem.controller';
import ReportItemValidations from './foundItem.validation';

const router = express.Router();

router.get('/', FoundItemControllers.getFoundItems);

router.get('/:id', FoundItemControllers.getFoundItemById);

router.get('/me', auth(userRoles.ADMIN, userRoles.USER), FoundItemControllers.getMyFoundItems);

router.post(
	'/',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(ReportItemValidations.ReportFoundItem),
	FoundItemControllers.ReportFoundItem
);

router.delete('/:id', auth(userRoles.ADMIN, userRoles.USER), FoundItemControllers.deleteFoundItem);

router.put(
	'/:id',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(ReportItemValidations.UpdateFoundItem),
	FoundItemControllers.updateFoundItem
);

const FoundItemRoutes = router;
export default FoundItemRoutes;
