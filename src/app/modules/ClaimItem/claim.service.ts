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

const updateStatus = async (claimId: string, payload: Claim, user: User) => {
	const claim = await prisma.claim.findUniqueOrThrow({
		where: {
			id: claimId
		},
		include: {
			foundItem: true
		}
	});

	if (claim.foundItem.userId !== user.id && user.role !== 'ADMIN') {
		throw new Error('You are not authorized to update the status of this claim');
	}

	if (claim.status !== ClaimStatus.PENDING) {
		throw new Error('You can only update the status of a pending claim');
	}

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
	deleteClaim
};

export default claimServices;
