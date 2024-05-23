import { User } from '@prisma/client';

const TUserRole = {
	ADMIN: 'ADMIN',
	USER: 'USER'
};

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
