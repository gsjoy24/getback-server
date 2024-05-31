import express from 'express';
import CategoryRoutes from '../modules/Category/category.routes';
import ClaimRoutes from '../modules/ClaimItem/claim.routes';
import FoundItemRoutes from '../modules/FoundItem/foundItem.routes';
import LostItemRoutes from '../modules/LostItem/lostItem.routes';
import NewsLetterSubscribeRouter from '../modules/NewsLetterSubscribe/newsLetterSubscribe.router';
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
		route: FoundItemRoutes
	},
	{
		path: '/',
		route: ClaimRoutes
	},
	{
		path: '/',
		route: LostItemRoutes
	},
	{
		path: '/',
		route: NewsLetterSubscribeRouter
	}
];

moduleRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
