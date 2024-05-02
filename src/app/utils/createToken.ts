import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
const createToken = (data: Partial<User>, secret: string, expiresIn: string) => {
	const token = jwt.sign(data, secret, {
		expiresIn,
		algorithm: 'HS256'
	});
	return token;
};

export default createToken;
