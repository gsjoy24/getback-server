import { FoundItem, Prisma, User } from '@prisma/client';
import { QueryOptions } from '../../types';
import prisma from '../../utils/prisma';
import { foundItemSearchableFields } from './foundItem.constant';

const ReportFoundItem = async (reportItem: FoundItem, userData: User) => {
	// check if the category exists
	await prisma.category.findUniqueOrThrow({
		where: {
			id: reportItem.categoryId
		}
	});

	const newReportItem = await prisma.foundItem.create({
		data: {
			...reportItem,
			userId: userData.id
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
			},
			category: true
		}
	});

	return newReportItem;
};

const getFoundItems = async (query: any, options: QueryOptions) => {
	const { searchTerm, ...restQueryData } = query;

	const page: number = Number(options.page) || 1;
	const limit: number = Number(options.limit) || 10;
	const skip: number = (Number(page) - 1) * limit;

	const sortBy: string = options.sortBy || 'createdAt';
	const sortOrder: string = options.sortOrder || 'desc';

	const conditions: Prisma.FoundItemWhereInput[] = [
		{
			isReturned: false
		}
	];

	if (searchTerm) {
		conditions.push({
			OR: foundItemSearchableFields.map((field) => ({
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

	const foundItems = await prisma.foundItem.findMany({
		where: { AND: conditions },
		skip,
		take: limit,
		orderBy: {
			[sortBy]: sortOrder
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
			},
			category: true
		}
	});

	const total = await prisma.foundItem.count({
		where: { AND: conditions }
	});

	return {
		meta: {
			limit,
			page,
			total
		},
		foundItems
	};
};

const getMyFoundItems = async (user: User, query: any, options: QueryOptions) => {
	const { searchTerm, ...restQueryData } = query;

	const page: number = Number(options.page) || 1;
	const limit: number = Number(options.limit) || 10;
	const skip: number = (Number(page) - 1) * limit;

	const sortBy: string = options.sortBy || 'createdAt';
	const sortOrder: string = options.sortOrder || 'desc';

	const conditions: Prisma.FoundItemWhereInput[] = [
		{
			userId: user.id
		}
	];

	if (searchTerm) {
		conditions.push({
			OR: foundItemSearchableFields.map((field) => ({
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

	const foundItems = await prisma.foundItem.findMany({
		where: { AND: conditions },
		skip,
		take: limit,
		orderBy: {
			[sortBy]: sortOrder
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
			},
			category: true
		}
	});

	const total = await prisma.foundItem.count({
		where: { AND: conditions }
	});

	return {
		meta: {
			limit,
			page,
			total
		},
		foundItems
	};
};

const getFoundItemById = async (id: string) => {
	const foundItem = await prisma.foundItem.findUnique({
		where: { id },
		include: {
			user: {
				select: {
					id: true,
					name: true,
					email: true,
					createdAt: true,
					updatedAt: true
				}
			},
			category: true,
			claim: true
		}
	});

	if (!foundItem) {
		throw new Error('Item not found');
	}

	return foundItem;
};

const deleteFoundItem = async (id: string, user: User) => {
	const foundItem = await prisma.foundItem.findUniqueOrThrow({
		where: { id }
	});

	if (foundItem.userId !== user.id) {
		throw new Error('You are not authorized to delete this item');
	}

	await prisma.$transaction(async (tx) => {
		await tx.claim.deleteMany({
			where: {
				foundItemId: id
			}
		});
		await tx.foundItem.delete({
			where: { id }
		});
	});

	return true;
};

const updateFoundItem = async (id: string, data: any, user: User) => {
	const foundItem = await prisma.foundItem.findUniqueOrThrow({
		where: { id }
	});

	if (foundItem.userId !== user.id && user.role !== 'ADMIN') {
		throw new Error('You are not authorized to update this item');
	}

	const updatedItem = await prisma.foundItem.update({
		where: { id },
		data
	});

	return updatedItem;
};

const FoundItemServices = {
	ReportFoundItem,
	deleteFoundItem,
	updateFoundItem,
	getFoundItems,
	getFoundItemById,
	getMyFoundItems
};
export default FoundItemServices;
