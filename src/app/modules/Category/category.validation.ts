import { z } from 'zod';

const createCategory = z.object({
	body: z.object({
		name: z
			.string({
				invalid_type_error: 'Name must be a string',
				required_error: 'Name of the category is required'
			})
			.min(3, {
				message: 'Name of the category must be at least 3 characters long'
			})
			.max(30, {
				message: 'Name of the category must be at most 30 characters long'
			})
	})
});

const CategoryValidation = {
	createCategory
};

export default CategoryValidation;
