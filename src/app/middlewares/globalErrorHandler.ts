import { NextFunction, Request, Response } from 'express';
import { ZodIssue } from 'zod';
const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	const modifiedError: any = {
		status: false,
		message: err?.message || 'Something went wrong!',
		errorDetails: err
	};

	if (err?.name === 'ZodError') {
		modifiedError.message = err?.issues?.map((issue: ZodIssue) => issue.message).join(', ');
	}

	res.status(err?.statusCode || 500).json(modifiedError);
};

export default globalErrorHandler;
