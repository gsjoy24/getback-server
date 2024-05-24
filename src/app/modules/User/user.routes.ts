import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import userRoles from '../../utils/userRoles';
import UserControllers from './user.controller';
import userValidationSchemas from './user.validation';
const router = express.Router();

router.get('/my-profile', auth(userRoles.ADMIN, userRoles.USER), UserControllers.getUserProfile);

router.post('/register', validateRequest(userValidationSchemas.createUser), UserControllers.createUser);

router.post('/login', validateRequest(userValidationSchemas.loginUser), UserControllers.loginUser);

router.put(
	'/my-profile',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(userValidationSchemas.updateUserProfile),
	UserControllers.updateUserProfile
);

export const userRoutes = router;
