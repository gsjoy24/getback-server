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
	const user = await UserServices.loginUser(email, password);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User logged in successfully',
		data: user
	});
});

const UserControllers = {
	createUser,
	loginUser
};

export default UserControllers;
