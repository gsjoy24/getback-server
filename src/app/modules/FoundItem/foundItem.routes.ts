import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import ReportItemControllers from './foundItem.controller';
import ReportItemValidations from './foundItem.validation';

const router = express.Router();

router.post(
	'/found-items',
	auth(),
	validateRequest(ReportItemValidations.ReportFoundItem),
	ReportItemControllers.ReportFoundItem
);

router.get('/found-items', auth(), ReportItemControllers.getFoundItems);

const ReportItemRoutes = router;
export default ReportItemRoutes;
