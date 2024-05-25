import { LostItem, Prisma, User, UserProfile } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../config';
import { QueryOptions } from '../../types';
import createToken from '../../utils/createToken';
import prisma from '../../utils/prisma';
import { userSearchableFields } from './user.constant';

const createUser = async (userData: User & { profile: UserProfile }) => {
	// i am separating the role to prevent create a admin from here. the admin will get created from the seed file or from the admin panel
	const { role, password, profile, ...restUserData } = userData;
	const hashedPassword = await bcrypt.hash(password, config.pass_salt);
	const modifiedUserData = { ...restUserData, password: hashedPassword };

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

const getAllUsers = async (query: any, options: QueryOptions) => {
	const { searchTerm, ...restQueryData } = query;

	const page: number = Number(options.page) || 1;
	const limit: number = Number(options.limit) || 10;
	const skip: number = (Number(page) - 1) * limit;

	const sortBy: string = options.sortBy || 'createdAt';
	const sortOrder: string = options.sortOrder || 'desc';

	const conditions: Prisma.UserWhereInput[] = [];

	if (searchTerm) {
		conditions.push({
			OR: userSearchableFields.map((field) => ({
				[field]: { contains: searchTerm, mode: 'insensitive' }
			}))
		});
	}

	if (Object.keys(restQueryData).length) {
		conditions.push({
			AND: Object.keys(restQueryData).map((key) => ({
				[key]: {
					equals: (restQueryData as any)[key]
				}
			}))
		});
	}

	const users = await prisma.user.findMany({
		where: { AND: conditions },
		skip,
		take: limit,
		orderBy: {
			[sortBy]: sortOrder
		}
	});

	const total = await prisma.user.count({
		where: { AND: conditions }
	});

	return {
		meta: {
			limit,
			page,
			total
		},
		users
	};
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
		phone: user.phone,
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
	const lostItems = await prisma.lostItem.findMany({
		where: {
			userId
		},
		take: 5,
		orderBy: {
			createdAt: 'desc'
		}
	});
	const foundItems = await prisma.foundItem.findMany({
		where: {
			userId
		},
		take: 5,
		orderBy: {
			createdAt: 'desc'
		}
	});

	const claimedItems = await prisma.claim.findMany({
		where: {
			userId
		},
		take: 5,
		orderBy: {
			createdAt: 'desc'
		}
	});
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
	return {
		...userProfile,
		lostItems,
		foundItems,
		claimedItems
	};
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

const UserServices = {
	createUser,
	loginUser,
	getUserProfile,
	updateUserProfile,
	toggleUserRole,
	getAllUsers
};

export default UserServices;
