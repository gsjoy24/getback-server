import prisma from '../../utils/prisma';

const createCategory = async (categoryData: any) => {
	await prisma.foundItemCategory.findFirst({
		where: {
			name: categoryData.name
		}
	});
	const newCategory = await prisma.foundItemCategory.create({
		data: categoryData
	});
	return newCategory;
};

const CategoryServices = {
	createCategory
};

export default CategoryServices;
