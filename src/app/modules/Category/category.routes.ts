import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import userRoles from '../../utils/userRoles';
import CategoryControllers from './category.controller';
import CategoryValidation from './category.validation';

const router = express.Router();

router.get('/categories', CategoryControllers.getCategories);

router.post(
	'/categories',
	validateRequest(CategoryValidation.createOrUpdateCategory),
	auth(userRoles.ADMIN),
	CategoryControllers.createCategory
);

router.put(
	'/categories/:id',
	validateRequest(CategoryValidation.createOrUpdateCategory),
	auth(userRoles.ADMIN),
	CategoryControllers.updateCategory
);

router.delete('/categories/:id', auth(userRoles.ADMIN), CategoryControllers.deleteCategory);

const CategoryRoutes = router;
export default CategoryRoutes;
