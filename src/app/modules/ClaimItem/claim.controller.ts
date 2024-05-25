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

const getClaims = catchAsync(async (req: Request, res: Response) => {
	const claims = await claimServices.getClaims();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Claims retrieved successfully',
		data: claims
	});
});

const updateStatus = catchAsync(async (req: Request, res: Response) => {
	const { claimId } = req.params;
	const { status } = req.body;
	const updatedClaim = await claimServices.updateStatus(claimId, status);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Claim status updated successfully',
		data: updatedClaim
	});
});

const deleteClaim = catchAsync(async (req: Request, res: Response) => {
	const { claimId } = req.params;
	await claimServices.deleteClaim(claimId, req.user as User);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Claim deleted successfully'
	});
});

const ClaimControllers = {
	claimItem,
	getClaims,
	updateStatus,
	deleteClaim
};

export default ClaimControllers;
