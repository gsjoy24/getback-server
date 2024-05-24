import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import pick from '../../utils/pick';
import sendResponse from '../../utils/sendResponse';
import { lostItemFilterAbleFields } from './lostItem.constant';
import LostItemServices from './lostItem.service';

const ReportLostItem = catchAsync(async (req: Request, res: Response) => {
	const reportItem = await LostItemServices.ReportLostItem(req.body, req.user as User);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Lost item reported successfully',
		data: reportItem
	});
});

const GetLostItems = catchAsync(async (req: Request, res: Response) => {
	const query = pick(req.query, lostItemFilterAbleFields);
	const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
	const { meta, lostItems } = await LostItemServices.GetLostItems(query, options);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Lost items fetched successfully',
		meta,
		data: lostItems
	});
});

const GetSingleLostItem = catchAsync(async (req: Request, res: Response) => {
	const lostItem = await LostItemServices.GetSingleLostItem(req.params.lostItemId);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Lost item fetched successfully',
		data: lostItem
	});
});

const UpdateLostItem = catchAsync(async (req: Request, res: Response) => {
	const updatedLostItem = await LostItemServices.UpdateLostItem(req.params.lostItemId, req.body, req.user as User);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Lost item updated successfully',
		data: updatedLostItem
	});
});

const DeleteLostItem = catchAsync(async (req: Request, res: Response) => {
	await LostItemServices.DeleteLostItem(req.params.lostItemId, req.user as User);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Lost item deleted successfully'
	});
});

const LostItemControllers = {
	ReportLostItem,
	GetLostItems,
	GetSingleLostItem,
	UpdateLostItem,
	DeleteLostItem
};

export default LostItemControllers;
