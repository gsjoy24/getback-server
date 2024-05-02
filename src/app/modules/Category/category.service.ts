import { FoundItemCategory } from '@prisma/client';
import prisma from '../../utils/prisma';

const createCategory = async (categoryData: FoundItemCategory) => {
	const isExist = await prisma.foundItemCategory.findUnique({
		where: {
			name: categoryData.name
		}
	});
	if (isExist) {
		throw new Error('Category already exist');
	}
	const newCategory = await prisma.foundItemCategory.create({
		data: categoryData
	});
	return newCategory;
};

const CategoryServices = {
	createCategory
};

export default CategoryServices;
