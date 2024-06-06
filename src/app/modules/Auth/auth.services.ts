import bcrypt from 'bcrypt';
import config from '../../config';
import { TPasswords } from '../../types';
import createToken from '../../utils/createToken';
import prisma from '../../utils/prisma';

const loginUser = async (email: string, password: string) => {
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			email
		}
	});

	if (user.status === 'BLOCKED') {
		throw new Error('Your account is suspended!');
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordMatch) {
		throw new Error('Invalid password');
	}
	const userData = {
		id: user.id,
		email: user.email,
		phone: user.phone,
		username: user.username,
		role: user.role
	};
	const accessToken = createToken(userData, config.accessSecret, config.accessSecretExp);
	const refreshToken = createToken(userData, config.refreshSecret, config.refreshSecretExp);

	return {
		name: user.name,
		...userData,
		accessToken,
		refreshToken
	};
};

const toggleUserRole = async (userId: string) => {
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			id: userId
		}
	});

	const result = await prisma.user.update({
		where: {
			id: userId
		},
		data: {
			role: user.role === 'USER' ? 'ADMIN' : 'USER'
		}
	});
	return result;
};

const toggleUserStatus = async (userId: string) => {
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			id: userId
		}
	});

	const result = await prisma.user.update({
		where: {
			id: userId
		},
		data: {
			status: user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE'
		}
	});
	return result;
};

const changeUserPassword = async (userId: string, payload: TPasswords) => {
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			id: userId
		}
	});

	const isPasswordMatch = await bcrypt.compare(payload.oldPassword, user.password);
	if (!isPasswordMatch) {
		throw new Error('Password does not match!');
	}

	const hashedPassword = await bcrypt.hash(payload.newPassword, config.pass_salt);
	const result = await prisma.user.update({
		where: {
			id: userId
		},
		data: {
			password: hashedPassword
		}
	});
	return;
};

const AuthServices = {
	loginUser,
	toggleUserRole,
	toggleUserStatus,
	changeUserPassword
};

export default AuthServices;
