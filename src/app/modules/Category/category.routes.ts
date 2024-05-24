import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import userRoles from '../../utils/userRoles';
import CategoryControllers from './category.controller';
import CategoryValidation from './category.validation';

const router = express.Router();

router.post(
	'/categories',
	validateRequest(CategoryValidation.createCategory),
	auth(userRoles.ADMIN),
	CategoryControllers.createCategory
);

router.get('/categories', CategoryControllers.getCategories);

const CategoryRoutes = router;
export default CategoryRoutes;
