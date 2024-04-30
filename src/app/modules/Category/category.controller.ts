import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import CategoryServices from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
	const category = await CategoryServices.createCategory(req.body);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Found item category created successfully',
		data: category
	});
});

const CategoryControllers = {
	createCategory
};

export default CategoryControllers;
