import { Claim, ClaimStatus, Prisma, User } from '@prisma/client';
import { QueryOptions } from '../../types';
import emailSender from '../../utils/emailSender';
import emailTemp from '../../utils/emailTemp';
import prisma from '../../utils/prisma';
import { claimSearchableFields } from './claim.constant';

type TResponse = {
	response: string;
	status: ClaimStatus;
};

const claimItem = async (claimItem: Claim, userData: User) => {
	console.log(claimItem, userData);
	// check if the the item exists
	await prisma.foundItem.findUniqueOrThrow({
		where: {
			id: claimItem.foundItemId
		}
	});

	// check if the user has already claimed the item

	const existingClaim = await prisma.claim.findFirst({
		where: {
			userId: userData.id,
			foundItemId: claimItem.foundItemId
		}
	});

	if (existingClaim) {
		throw new Error('You have already claimed this item');
	}

	const newClaimItem = await prisma.claim.create({
		data: {
			...claimItem,
			userId: userData.id
		}
	});

	return newClaimItem;
};

const getClaims = async (query: any, options: QueryOptions) => {
	const { searchTerm, ...restQueryData } = query;

	const page: number = Number(options.page) || 1;
	const limit: number = Number(options.limit) || 10;
	const skip: number = (Number(page) - 1) * limit;

	const sortBy: string = options.sortBy || 'createdAt';
	const sortOrder: string = options.sortOrder || 'desc';

	const conditions: Prisma.ClaimWhereInput[] = [];

	if (searchTerm) {
		conditions.push({
			OR: claimSearchableFields.map((field) => ({
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

	const claims = await prisma.claim.findMany({
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
					phone: true
				}
			},
			foundItem: true
		}
	});

	const total = await prisma.claim.count({
		where: { AND: conditions }
	});

	return {
		meta: {
			limit,
			page,
			total
		},
		claims
	};
};

const getMyClaims = async (userId: string, options: QueryOptions) => {
	const page: number = Number(options.page) || 1;
	const limit: number = Number(options.limit) || 10;
	const skip: number = (Number(page) - 1) * limit;

	const sortBy: string = options.sortBy || 'createdAt';
	const sortOrder: string = options.sortOrder || 'desc';

	const claims = await prisma.claim.findMany({
		where: {
			userId
		},
		skip,
		take: limit,
		orderBy: {
			[sortBy]: sortOrder
		},
		include: {
			foundItem: true
		}
	});

	const total = await prisma.claim.count({
		where: {
			userId
		}
	});

	return {
		meta: {
			limit,
			page,
			total
		},
		claims
	};
};

const updateClaim = async (claimId: string, payload: Claim, user: User) => {
	// status and response can only be updated by an admin or the user who reported the found item
	const { status, response, ...restData } = payload;

	if (status && response) {
		throw new Error('You are not authorized to update the status or response of this claim');
	}

	const data = await prisma.claim.findUniqueOrThrow({
		where: {
			id: claimId
		}
	});

	if (data.userId !== user.id) {
		throw new Error('You are not authorized to update this claim');
	}

	if (data.status === ClaimStatus.REJECTED || data.status === ClaimStatus.APPROVED) {
		throw new Error('You can only update a pending claim!');
	}

	const claim = await prisma.claim.update({
		where: {
			id: claimId
		},
		data: {
			...restData
		}
	});

	return claim;
};

const updateStatus = async (claimId: string, payload: TResponse, user: User) => {
	const claim = await prisma.claim.findUniqueOrThrow({
		where: {
			id: claimId
		},
		include: {
			foundItem: true,
			user: {
				select: {
					id: true,
					name: true,
					email: true,
					phone: true
				}
			}
		}
	});

	if (claim.foundItem.userId !== user.id && user.role !== 'ADMIN') {
		throw new Error('You are not authorized to update the status of this claim');
	}

	if (claim.status !== ClaimStatus.PENDING) {
		throw new Error('You can only update the status of a pending claim');
	}

	await emailSender('Claim Status Notification', claim.user.email, emailTemp(claim.user.name, payload));

	const updatedClaim = await prisma.claim.update({
		where: {
			id: claimId
		},
		data: {
			...payload
		}
	});

	return updatedClaim;
};

const deleteClaim = async (claimId: string, userData: User) => {
	const data = await prisma.claim.findUniqueOrThrow({
		where: {
			id: claimId
		}
	});

	if (data.userId !== userData.id && userData.role !== 'ADMIN') {
		throw new Error('You are not authorized to delete this claim');
	}

	await prisma.claim.delete({
		where: {
			id: claimId
		}
	});
};

const claimServices = {
	claimItem,
	getClaims,
	updateClaim,
	updateStatus,
	deleteClaim,
	getMyClaims
};

export default claimServices;
