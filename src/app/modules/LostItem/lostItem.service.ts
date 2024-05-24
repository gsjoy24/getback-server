import { LostItem, Prisma, User } from '@prisma/client';
import { QueryOptions } from '../../types';
import prisma from '../../utils/prisma';
import { lostItemSearchableFields } from './lostItem.constant';

const ReportLostItem = async (reportItem: LostItem, userData: User) => {
	// check if the category exists
	await prisma.foundItemCategory.findUniqueOrThrow({
		where: {
			id: reportItem.categoryId
		}
	});

	const newReportItem = await prisma.lostItem.create({
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

const getLostItems = async (query: any, options: QueryOptions) => {
	const { searchTerm, ...restQueryData } = query;

	const page: number = Number(options.page) || 1;
	const limit: number = Number(options.limit) || 10;
	const skip: number = (Number(page) - 1) * limit;

	const sortBy: string = options.sortBy || 'createdAt';
	const sortOrder: string = options.sortOrder || 'desc';

	const conditions: Prisma.LostItemWhereInput[] = [];

	if (searchTerm) {
		conditions.push({
			OR: lostItemSearchableFields.map((field) => ({
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

	const foundItems = await prisma.lostItem.findMany({
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

	const total = await prisma.lostItem.count({
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

const ReportItemServices = {
	ReportLostItem,
	getLostItems
};

export default ReportItemServices;
