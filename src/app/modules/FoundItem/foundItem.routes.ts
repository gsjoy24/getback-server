import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import userRoles from '../../utils/userRoles';
import ReportItemControllers from './foundItem.controller';
import ReportItemValidations from './foundItem.validation';

const router = express.Router();

router.post(
	'/found-items',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(ReportItemValidations.ReportFoundItem),
	ReportItemControllers.ReportFoundItem
);

router.get('/found-items', ReportItemControllers.getFoundItems);

const ReportItemRoutes = router;
export default ReportItemRoutes;
