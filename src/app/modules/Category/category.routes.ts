import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import CategoryControllers from './category.controller';
import CategoryValidation from './category.validation';

const router = express.Router();

router.post(
	'/found-item-categories',
	validateRequest(CategoryValidation.createCategory),
	auth(),
	CategoryControllers.createCategory
);

const CategoryRoutes = router;
export default CategoryRoutes;
