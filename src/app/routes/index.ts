import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
const router = express.Router();

const moduleRoutes = [
	{
		path: '/',
		route: userRoutes
	}
];

moduleRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
