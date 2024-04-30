import { NextFunction, Request, Response } from 'express';
import config from '../config';
import prisma from '../utils/prisma';
import verifyToken from '../utils/verifyToken';

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization;
		if (!token) {
			throw new Error('You are not authorized!');
		}
		const verifiedUser = verifyToken(token, config.accessSecret);

		await prisma.user.findUniqueOrThrow({ where: { email: verifiedUser.email } });

		next();
	} catch (error) {
		next(error);
	}
};

export default auth;
