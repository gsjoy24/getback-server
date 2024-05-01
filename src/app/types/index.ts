import { User } from '@prisma/client';

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}

export type QueryOptions = {
	limit?: number;
	page?: number;
	sortBy?: string;
	sortOrder?: string;
};