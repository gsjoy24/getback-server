import express from 'express';
import CategoryRoutes from '../modules/Category/category.routes';
import ReportItemRoutes from '../modules/ReportItem/reportItem.routes';
import { userRoutes } from '../modules/User/user.routes';
const router = express.Router();

const moduleRoutes = [
	{
		path: '/',
		route: userRoutes
	},
	{
		path: '/',
		route: CategoryRoutes
	},
	{
		path: '/',
		route: ReportItemRoutes
	}
];

moduleRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
