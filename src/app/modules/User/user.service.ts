import { User, UserProfile } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../config';
import createToken from '../../utils/createToken';
import prisma from '../../utils/prisma';

const createUser = async (userData: User & { profile: UserProfile }) => {
	if (userData?.role === 'ADMIN') {
		throw new Error('You are not authorized to create an admin!');
	}
	const { password, profile, ...restUserData } = userData;
	const hashedPassword = await bcrypt.hash(password, config.pass_salt);
	const modifiedUserData = { ...restUserData, role: 'USER', password: hashedPassword };

	const newUser = await prisma.$transaction(async (trx) => {
		const user = await trx.user.create({
			data: modifiedUserData,
			select: {
				id: true,
				name: true,
				email: true,
				createdAt: true,
				updatedAt: true
			}
		});
		const userProfile = await trx.userProfile.create({
			data: {
				...profile,
				userId: user.id
			}
		});
		return { ...user, profile: userProfile };
	});
	return newUser;
};

const createAdmin = async (userData: User & { profile: UserProfile }) => {
	const { password, profile, ...restUserData } = userData;
	const hashedPassword = await bcrypt.hash(password, config.pass_salt);
	const modifiedUserData = { ...restUserData, role: 'ADMIN', password: hashedPassword };

	const newUser = await prisma.$transaction(async (trx) => {
		const user = await trx.user.create({
			data: modifiedUserData,
			select: {
				id: true,
				name: true,
				email: true,
				createdAt: true,
				updatedAt: true
			}
		});
		const userProfile = await trx.userProfile.create({
			data: {
				...profile,
				userId: user.id
			}
		});
		return { ...user, profile: userProfile };
	});
	return newUser;
};

const loginUser = async (email: string, password: string) => {
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			email
		}
	});

	const isPasswordMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordMatch) {
		throw new Error('Invalid password');
	}
	const userData = {
		id: user.id,
		email: user.email,
		role: user.role
	};
	const token = createToken(userData, config.accessSecret, config.accessSecretExp);
	const refreshToken = createToken(userData, config.refreshSecret, config.refreshSecretExp);

	return {
		name: user.name,
		...userData,
		token,
		refreshToken
	};
};

const getUserProfile = async (userId: string) => {
	const userProfile = await prisma.userProfile.findUniqueOrThrow({
		where: {
			userId
		},
		include: {
			user: {
				select: {
					id: true,
					name: true,
					email: true,
					createdAt: true,
					updatedAt: true
				}
			}
		}
	});
	return userProfile;
};

const updateUserProfile = async (userId: string, profileData: UserProfile) => {
	const userProfile = await prisma.userProfile.update({
		where: {
			userId
		},
		include: {
			user: {
				select: {
					id: true,
					name: true,
					email: true,
					createdAt: true,
					updatedAt: true
				}
			}
		},
		data: profileData
	});
	return userProfile;
};

const UserServices = {
	createUser,
	createAdmin,
	loginUser,
	getUserProfile,
	updateUserProfile
};

export default UserServices;
