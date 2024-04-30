import { Response } from 'express';
type ResponseData = {
	statusCode: number;
	success: boolean;
	message: string;
	data?: any;
	meta?: {
		limit: number;
		page: number;
		total: number;
	};
};
const sendResponse = (res: Response, data: any) => {
	const { statusCode, success, message, data: responseData, meta } = data;
	const modifiedResponseData: ResponseData = {
		success,
		statusCode,
		message
	};

	meta && (modifiedResponseData.meta = meta);
	data && (modifiedResponseData.data = responseData);
	res.status(statusCode).json(modifiedResponseData);
};

export default sendResponse;
