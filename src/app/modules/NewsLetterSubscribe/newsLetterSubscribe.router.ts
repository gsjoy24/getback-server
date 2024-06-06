import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import NewsLetterSubscribeControllers from './newsLetterSubscribe.controller';
import NewsLetterSubscribeValidation from './newsLetterSubscribe.validation';

const router = express.Router();

router.post(
	'/subscribe',
	validateRequest(NewsLetterSubscribeValidation),
	NewsLetterSubscribeControllers.createNewSubscriber
);
router.get('/subscribers', NewsLetterSubscribeControllers.getSubscribers);
router.delete(
	'/unsubscribe',
	validateRequest(NewsLetterSubscribeValidation),
	NewsLetterSubscribeControllers.unsubscribeSubscriber
);

const NewsLetterSubscribeRouter = router;
export default NewsLetterSubscribeRouter;
