import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import UserControllers from './user.controller';
import userValidationSchemas from './user.validation';
const router = express.Router();

router.get('/my-profile', auth(), UserControllers.getUserProfile);

router.post('/register', validateRequest(userValidationSchemas.createUser), UserControllers.createUser);

router.post('/login', validateRequest(userValidationSchemas.loginUser), UserControllers.loginUser);

export const userRoutes = router;
