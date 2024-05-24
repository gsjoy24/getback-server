import { z } from 'zod';

const ReportLostItem = z.object({
	body: z.object({
		categoryId: z.string({
			required_error: 'Category id is required'
		}),
		itemName: z
			.string({
				required_error: 'Found item name is required'
			})
			.min(5, {
				message: 'Found item name must be at least 5 characters long'
			}),
		description: z
			.string({
				required_error: 'Description is required'
			})
			.min(5, {
				message: 'Description must be at least 5 characters long'
			}),
		location: z.string({
			required_error: 'Location is required'
		}),
		pictures: z.array(z.string()),
		lostDate: z.string({
			required_error: 'Lost date is required'
		})
	})
});

const UpdateLostItem = z.object({
	body: z.object({
		categoryId: z.string().optional(),
		itemName: z
			.string()
			.min(5, {
				message: 'Found item name must be at least 5 characters long'
			})
			.optional(),
		description: z
			.string()
			.min(5, {
				message: 'Description must be at least 5 characters long'
			})
			.optional(),
		location: z.string().optional(),
		pictures: z.array(z.string()).optional(),
		lostDate: z.string().optional()
	})
});

const LostValidations = {
	ReportLostItem,
	UpdateLostItem
};

export default LostValidations;
