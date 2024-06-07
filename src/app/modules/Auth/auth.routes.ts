import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import userRoles from '../../utils/userRoles';
import AuthControllers from './auth.controller';
import AuthValidation from './auth.validation';

const router = express.Router();

router.post('/login', validateRequest(AuthValidation.loginUser), AuthControllers.loginUser);

router.put('/toggle-user-role/:id', auth(userRoles.ADMIN), AuthControllers.toggleUserRole);

router.put('/toggle-user-status/:id', auth(userRoles.ADMIN), AuthControllers.toggleUserStatus);

router.put(
	'/change-password',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(AuthValidation.changePassword),
	AuthControllers.changeUserPassword
);

router.delete(
	'/delete-account',
	auth(userRoles.ADMIN, userRoles.USER),
	validateRequest(AuthValidation.deleteAccount),
	AuthControllers.deleteAccount
);

const authRoutes = router;

export default authRoutes;
