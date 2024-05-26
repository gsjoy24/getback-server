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

const updateCategory = async (categoryId: string, categoryData: Category) => {
	await prisma.category.findUniqueOrThrow({
		where: {
			id: categoryId
		}
	});

	const updatedCategory = await prisma.category.update({
		where: {
			id: categoryId
		},
		data: categoryData
	});
	return updatedCategory;
};

const deleteCategory = async (categoryId: string) => {
	const deletedCategory = await prisma.category.delete({
		where: {
			id: categoryId
		}
	});
	return deletedCategory;
};

const CategoryServices = {
	createCategory,
	getCategories,
	updateCategory,
	deleteCategory
};

export default CategoryServices;
