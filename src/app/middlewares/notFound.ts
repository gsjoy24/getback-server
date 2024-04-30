import { Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (req: Request, res: Response) => {
	res.status(httpStatus.FORBIDDEN).json({
		status: false,
		message: 'API not found!',
		errorDetails: {
			path: req.originalUrl,
			message: 'You are trying to access an API that does not exist!'
		}
	});
};

export default notFound;
