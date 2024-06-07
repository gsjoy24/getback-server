import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AuthServices from './auth.services';

const loginUser = catchAsync(async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const { refreshToken, ...restData } = await AuthServices.loginUser(email, password);

	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		secure: false,
		sameSite: 'none',
		maxAge: 1000 * 60 * 60 * 24 * 365
	});

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'User logged in successfully',
		data: restData
	});
});

const toggleUserRole = catchAsync(async (req: Request, res: Response) => {
	const user = await AuthServices.toggleUserRole(req.params.id);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'User role updated successfully',
		data: user
	});
});

const toggleUserStatus = catchAsync(async (req: Request, res: Response) => {
	const user = await AuthServices.toggleUserStatus(req.params.id);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'User status updated successfully',
		data: user
	});
});

const changeUserPassword = catchAsync(async (req: Request, res: Response) => {
	const { oldPassword, newPassword } = req.body;
	await AuthServices.changeUserPassword(req.user?.id as string, { oldPassword, newPassword });
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'User password updated successfully!'
	});
});

const deleteAccount = catchAsync(async (req: Request, res: Response) => {
	const { password } = req?.body;
	const result = await AuthServices.deleteAccount(password, req.user?.id as string);
	sendResponse(res, {
		statusCode: httpStatus.NO_CONTENT,
		success: true,
		message: 'User account deleted successfully!'
	});
});

const AuthControllers = {
	loginUser,
	toggleUserRole,
	toggleUserStatus,
	changeUserPassword,
	deleteAccount
};

export default AuthControllers;
