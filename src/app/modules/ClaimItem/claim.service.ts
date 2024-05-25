import { Claim, ClaimStatus, User } from '@prisma/client';
import prisma from '../../utils/prisma';

const claimItem = async (claimItem: Claim, userData: User) => {
	// check if the the item exists
	await prisma.foundItem.findUniqueOrThrow({
		where: {
			id: claimItem.foundItemId
		}
	});

	const newClaimItem = await prisma.claim.create({
		data: {
			...claimItem,
			userId: userData.id
		}
	});

	return newClaimItem;
};

const getClaims = async () => {
	const claims = await prisma.claim.findMany({
		include: {
			foundItem: {
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
			}
		}
	});
	return claims;
};

const updateStatus = async (claimId: string, status: ClaimStatus) => {
	await prisma.claim.findUniqueOrThrow({
		where: {
			id: claimId
		}
	});

	const claim = await prisma.claim.update({
		where: {
			id: claimId
		},
		data: {
			status
		}
	});

	return claim;
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
	updateStatus,
	deleteClaim
};

export default claimServices;
