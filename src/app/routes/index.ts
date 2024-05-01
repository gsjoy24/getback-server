import express from 'express';
import CategoryRoutes from '../modules/Category/category.routes';
import ClaimRoutes from '../modules/ClaimItem/claim.routes';
import ReportItemRoutes from '../modules/FoundItem/foundItem.routes';
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
	},
	{
		path: '/',
		route: ClaimRoutes
	}
];

moduleRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
