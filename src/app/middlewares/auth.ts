import { NextFunction, Request, Response } from 'express';
import config from '../config';
import prisma from '../utils/prisma';
import verifyToken from '../utils/verifyToken';

const auth =
	(...roles: string[]) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const token = req.headers.authorization;
			if (!token) {
				throw new Error('You are not authorized!');
			}
			const verifiedUser = verifyToken(token, config.accessSecret);

			const user = await prisma.user.findUniqueOrThrow({
				where: { email: verifiedUser.email }
			});

			if (roles.length && !roles.includes(user.role)) {
				throw new Error('You are not authorized!');
			}
			req.user = user;

			next();
		} catch (error) {
			next(error);
		}
	};

export default auth;
