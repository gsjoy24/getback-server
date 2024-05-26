import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import pick from '../../utils/pick';
import sendResponse from '../../utils/sendResponse';
import { foundItemFilterAbleFields } from './foundItem.constant';
import FoundItemServices from './foundItem.service';

const ReportFoundItem = catchAsync(async (req: Request, res: Response) => {
	const reportItem = await FoundItemServices.ReportFoundItem(req.body, req.user as User);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Found item reported successfully',
		data: reportItem
	});
});

const getFoundItems = catchAsync(async (req: Request, res: Response) => {
	const query = pick(req.query, foundItemFilterAbleFields);
	const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
	const { meta, foundItems } = await FoundItemServices.getFoundItems(query, options);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Found items retrieved successfully',
		meta,
		data: foundItems
	});
});

const getFoundItemById = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const foundItem = await FoundItemServices.getFoundItemById(id);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Found item retrieved successfully',
		data: foundItem
	});
});

const getMyFoundItems = catchAsync(async (req: Request, res: Response) => {
	const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
	const { meta, foundItems } = await FoundItemServices.getMyFoundItems(req.user as User, options);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Found items retrieved successfully',
		meta,
		data: foundItems
	});
});

const deleteFoundItem = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	await FoundItemServices.deleteFoundItem(id, req.user as User);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Found item deleted successfully'
	});
});

const updateFoundItem = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const updatedItem = await FoundItemServices.updateFoundItem(id, req.body, req.user as User);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Found item updated successfully',
		data: updatedItem
	});
});

const FoundItemControllers = {
	ReportFoundItem,
	getFoundItems,
	deleteFoundItem,
	updateFoundItem,
	getFoundItemById,
	getMyFoundItems
};

export default FoundItemControllers;
