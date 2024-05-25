import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import userRoles from '../../utils/userRoles';
import UserControllers from './user.controller';
import userValidationSchemas from './user.validation';
const router = express.Router();

router.get('/my-profile', auth(userRoles.ADMIN, userRoles.USER), UserControllers.getUserProfile);

router.post('/register', validateRequest(userValidationSchemas.createUser), UserControllers.createUser);

router.get('/all', auth(userRoles.ADMIN), UserControllers.getAllUsers);

router.post('/login', validateRequest(userValidationSchemas.loginUser), UserControllers.loginUser);

router.put(
	'/my-profile',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(userValidationSchemas.updateUserProfile),
	UserControllers.updateUserProfile
);

router.put('/toggle-user-role/:id', auth(userRoles.ADMIN), UserControllers.toggleUserRole);

router.put('/toggle-user-status/:id', auth(userRoles.ADMIN), UserControllers.toggleUserStatus);

export const userRoutes = router;
