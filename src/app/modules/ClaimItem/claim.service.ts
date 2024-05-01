import { Claim, User } from '@prisma/client';
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
					user: true,
					category: true
				}
			}
		}
	});
	return claims;
};

const claimServices = {
	claimItem,
	getClaims
};
export default claimServices;
