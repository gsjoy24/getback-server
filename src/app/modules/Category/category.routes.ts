import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import userRoles from '../../utils/userRoles';
import CategoryControllers from './category.controller';
import CategoryValidation from './category.validation';

const router = express.Router();

router.get('/', CategoryControllers.getCategories);

router.post(
	'/',
	validateRequest(CategoryValidation.createOrUpdateCategory),
	auth(userRoles.ADMIN),
	CategoryControllers.createCategory
);

router.put(
	'/:id',
	validateRequest(CategoryValidation.createOrUpdateCategory),
	auth(userRoles.ADMIN),
	CategoryControllers.updateCategory
);

router.delete('/:id', auth(userRoles.ADMIN), CategoryControllers.deleteCategory);

const CategoryRoutes = router;
export default CategoryRoutes;
