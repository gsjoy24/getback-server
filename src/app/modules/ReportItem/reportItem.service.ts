import { User } from '@prisma/client';
import prisma from '../../utils/prisma';
import { ReportItem } from './reportItem.types';

const createReportItem = async (reportItem: ReportItem, userData: User) => {
	// Omit the password from the user data
	const { password, ...restUserData } = userData;
	// check if the category exists
	await prisma.foundItemCategory.findUniqueOrThrow({
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
			category: true
		}
	});

	return {
		...newReportItem,
		user: restUserData
	};
};

const reportItemServices = {
	createReportItem
};
export default reportItemServices;
