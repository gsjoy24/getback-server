import express from 'express';
import authRoutes from '../modules/Auth/auth.routes';
import CategoryRoutes from '../modules/Category/category.routes';
import ClaimRoutes from '../modules/ClaimItem/claim.routes';
import FoundItemRoutes from '../modules/FoundItem/foundItem.routes';
import LostItemRoutes from '../modules/LostItem/lostItem.routes';
import NewsLetterSubscribeRouter from '../modules/NewsLetterSubscribe/newsLetterSubscribe.router';
import { userRoutes } from '../modules/User/user.routes';
const router = express.Router();

const moduleRoutes = [
	{
		path: '/users',
		route: userRoutes
	},
	{
		path: '/auth',
		route: authRoutes
	},
	{
		path: '/categories',
		route: CategoryRoutes
	},
	{
		path: '/found-items',
		route: FoundItemRoutes
	},
	{
		path: '/claims',
		route: ClaimRoutes
	},
	{
		path: '/lost-items',
		route: LostItemRoutes
	},
	{
		path: '/newsletter',
		route: NewsLetterSubscribeRouter
	}
];

moduleRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
