import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
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

const loginUser = catchAsync(async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const { refreshToken, ...restData } = await UserServices.loginUser(email, password);

	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		secure: false
	});

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'User logged in successfully',
		data: restData
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
	loginUser,
	getUserProfile,
	updateUserProfile
};

export default UserControllers;
