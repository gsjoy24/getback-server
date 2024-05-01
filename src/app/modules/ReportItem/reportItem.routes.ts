import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import ReportItemControllers from './reportItem.controller';
import ReportItemValidations from './reportItem.validation';

const router = express.Router();

router.post(
	'/found-items',
	auth(),
	validateRequest(ReportItemValidations.createReportItem),
	ReportItemControllers.createReportItem
);

const ReportItemRoutes = router;
export default ReportItemRoutes;
