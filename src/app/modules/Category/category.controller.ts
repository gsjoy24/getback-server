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
		message: 'Category created successfully',
		data: category
	});
});

const getCategories = catchAsync(async (req: Request, res: Response) => {
	const categories = await CategoryServices.getCategories();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Categories fetched successfully',
		data: categories
	});
});

const CategoryControllers = {
	createCategory,
	getCategories
};

export default CategoryControllers;
