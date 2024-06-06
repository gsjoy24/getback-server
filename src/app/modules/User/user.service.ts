import { Prisma, User, UserProfile } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../config';
import { QueryOptions } from '../../types';

import prisma from '../../utils/prisma';
import { userSearchableFields } from './user.constant';

const createUser = async (userData: User & { profile: UserProfile }) => {
	// i am separating the role to prevent create a admin from here. the admin will get created from the seed file or from the admin panel
	const checkUserName = await prisma.user.findFirst({
		where: {
			username: userData.username
		}
	});

	if (checkUserName) {
		throw new Error('Username already exists!');
	}

	const checkEmail = await prisma.user.findFirst({
		where: {
			email: userData.email
		}
	});

	if (checkEmail) {
		throw new Error('This email is already registered!');
	}

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
		},
		select: {
			id: true,
			name: true,
			username: true,
			email: true,
			phone: true,
			role: true,
			status: true,
			createdAt: true,
			updatedAt: true,
			userProfile: true
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

const getUserProfile = async (userId: string) => {
	const lostItems = await prisma.lostItem.findMany({
		where: {
			userId
		},
		take: 4,
		orderBy: {
			createdAt: 'desc'
		}
	});

	const foundItems = await prisma.foundItem.findMany({
		where: {
			userId
		},
		take: 4,
		orderBy: {
			createdAt: 'desc'
		}
	});

	const claimedItems = await prisma.claim.findMany({
		where: {
			userId
		},
		take: 4,
		orderBy: {
			createdAt: 'desc'
		}
	});

	// all counts
	const foundItemsCount = await prisma.foundItem.count({
		where: {
			userId
		}
	});
	const claimedItemsCount = await prisma.claim.count({
		where: {
			userId
		}
	});
	const lostItemsCount = await prisma.lostItem.count({
		where: {
			userId
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
					username: true,
					email: true,
					phone: true,
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
		claimedItems,
		counts: {
			lostItems: lostItemsCount,
			foundItems: foundItemsCount,
			claimedItems: claimedItemsCount
		}
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

const UserServices = {
	createUser,
	getUserProfile,
	updateUserProfile,
	getAllUsers
};

export default UserServices;
