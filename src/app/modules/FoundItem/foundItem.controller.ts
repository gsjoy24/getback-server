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

const FoundItemControllers = {
	ReportFoundItem,
	getFoundItems
};

export default FoundItemControllers;
