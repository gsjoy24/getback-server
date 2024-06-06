import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import pick from '../../utils/pick';
import sendResponse from '../../utils/sendResponse';
import { userFilterAbleFields } from './user.constant';
import UserServices from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
	const user = await UserServices.createUser(req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User registered successfully',
		data: user
	});
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
	const query = pick(req.query, userFilterAbleFields);
	const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
	const { meta, users } = await UserServices.getAllUsers(query, options);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Users retrieved successfully',
		meta,
		data: users
	});
});

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
	const profile = await UserServices.getUserProfile(req.user?.id as string);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Profile retrieved successfully',
		data: profile
	});
});

const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
	const profile = await UserServices.updateUserProfile(req.user?.id as string, req.body);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'User profile updated successfully',
		data: profile
	});
});

const UserControllers = {
	createUser,
	getAllUsers,
	getUserProfile,
	updateUserProfile
};

export default UserControllers;
