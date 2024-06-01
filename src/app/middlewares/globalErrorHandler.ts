import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ZodIssue } from 'zod';
const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	const modifiedError: any = {
		status: false,
		message: err?.message || 'Something went wrong!',
		errorDetails: err
	};

	let message = err.message || 'Something went wrong!';
	if (err?.name === 'ZodError') {
		modifiedError.message = err?.issues?.map((issue: ZodIssue) => issue.message).join(', ');
	} else if (err instanceof Prisma.PrismaClientValidationError) {
		message = 'Invalid input data!';
	} else if (err instanceof Prisma.PrismaClientKnownRequestError) {
		if (err.code === 'P2025') {
			message = 'Record not found!';
		} else if (err.code === 'P2002') {
			message = `${err?.meta?.target} already exists!`;
		}
	}

	res.status(err?.statusCode || 500).json(modifiedError);
};

export default globalErrorHandler;
