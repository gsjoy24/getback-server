import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import userRoles from '../../utils/userRoles';
import UserControllers from './user.controller';
import userValidationSchemas from './user.validation';
const router = express.Router();

router.post('/register', validateRequest(userValidationSchemas.createUser), UserControllers.createUser);

router.get('/', auth(userRoles.ADMIN), UserControllers.getAllUsers);

router.get('/me', auth(userRoles.ADMIN, userRoles.USER), UserControllers.getUserProfile);

router.put(
	'/me',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(userValidationSchemas.updateUserProfile),
	UserControllers.updateUserProfile
);

export const userRoutes = router;
