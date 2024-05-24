import { Category } from '@prisma/client';
import prisma from '../../utils/prisma';

const createCategory = async (categoryData: Category) => {
	const isExist = await prisma.category.findUnique({
		where: {
			name: categoryData.name
		}
	});
	if (isExist) {
		throw new Error('Category already exist!');
	}
	const newCategory = await prisma.category.create({
		data: categoryData
	});
	return newCategory;
};

const getCategories = async () => {
	const categories = await prisma.category.findMany({
		orderBy: {
			name: 'asc'
		}
	});
	return categories;
};

const CategoryServices = {
	createCategory,
	getCategories
};

export default CategoryServices;
