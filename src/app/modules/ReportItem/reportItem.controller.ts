import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import reportItemServices from './reportItem.service';

const createReportItem = catchAsync(async (req: Request, res: Response) => {
	const reportItem = await reportItemServices.createReportItem(req.body, req.user as User);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Found item reported successfully',
		data: reportItem
	});
});
const ReportItemControllers = {
	createReportItem
};

export default ReportItemControllers;
