import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import claimServices from './claim.service';

const claimItem = catchAsync(async (req: Request, res: Response) => {
	const claimItem = await claimServices.claimItem(req.body, req.user as User);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Claim created successfully',
		data: claimItem
	});
});

const ClaimControllers = {
	claimItem
};

export default ClaimControllers;
