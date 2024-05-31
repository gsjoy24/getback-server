import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import NewsLetterSubscribeServices from './newsLetterSubscribe.service';

const createNewSubscriber = catchAsync(async (req: Request, res: Response) => {
	const { email } = req.body;
	const newSubscriber = await NewsLetterSubscribeServices.createNewSubscriber(email);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'You have successfully subscribed to our newsletter!',
		data: newSubscriber
	});
});

const getSubscribers = catchAsync(async (req: Request, res: Response) => {
	const subscribers = await NewsLetterSubscribeServices.getSubscribers();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Subscribers fetched successfully',
		data: subscribers
	});
});

const unsubscribeSubscriber = catchAsync(async (req: Request, res: Response) => {
	const { email } = req.body;
	await NewsLetterSubscribeServices.unsubscribeSubscriber(email);
	sendResponse(res, {
		statusCode: httpStatus.NO_CONTENT,
		success: true,
		message: 'You have successfully unsubscribed from our newsletter!'
	});
});

const NewsLetterSubscribeControllers = {
	createNewSubscriber,
	getSubscribers,
	unsubscribeSubscriber
};

export default NewsLetterSubscribeControllers;
