import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import pick from '../../utils/pick';
import sendResponse from '../../utils/sendResponse';
import { lostItemFilterAbleFields } from './lostItem.constant';
import LostItemServices from './lostItem.service';

const reportLostItem = catchAsync(async (req: Request, res: Response) => {
	const reportItem = await LostItemServices.reportLostItem(req.body, req.user as User);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Lost item reported successfully',
		data: reportItem
	});
});

const getLostItems = catchAsync(async (req: Request, res: Response) => {
	const query = pick(req.query, lostItemFilterAbleFields);
	const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
	const { meta, lostItems } = await LostItemServices.getLostItems(query, options);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Lost items fetched successfully',
		meta,
		data: lostItems
	});
});

const getMyLostItems = catchAsync(async (req: Request, res: Response) => {
	const query = pick(req.query, lostItemFilterAbleFields);
	const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
	const { meta, lostItems } = await LostItemServices.getMyLostItems(req.user as User, options, query);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'My lost items fetched successfully',
		meta,
		data: lostItems
	});
});

const getSingleLostItem = catchAsync(async (req: Request, res: Response) => {
	const lostItem = await LostItemServices.getSingleLostItem(req.params.lostItemId);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Lost item fetched successfully',
		data: lostItem
	});
});

const updateLostItem = catchAsync(async (req: Request, res: Response) => {
	const updatedLostItem = await LostItemServices.updateLostItem(req.params.lostItemId, req.body, req.user as User);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Lost item updated successfully',
		data: updatedLostItem
	});
});

const deleteLostItem = catchAsync(async (req: Request, res: Response) => {
	await LostItemServices.deleteLostItem(req.params.lostItemId, req.user as User);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Lost item deleted successfully'
	});
});

const LostItemControllers = {
	reportLostItem,
	getLostItems,
	getSingleLostItem,
	updateLostItem,
	deleteLostItem,
	getMyLostItems
};

export default LostItemControllers;
