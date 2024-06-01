import { z } from 'zod';

const createUser = z.object({
	body: z.object({
		name: z
			.string({
				required_error: 'Name is required!'
			})
			.min(3, {
				message: 'Name must be at least 3 characters!'
			})
			.max(255),
		username: z.string({
			required_error: 'Username is required!'
		}),
		email: z
			.string({
				required_error: 'Email is required!'
			})
			.email({
				message: 'Invalid email address!'
			}),
		password: z
			.string({
				required_error: 'Password is required!'
			})
			.min(6, {
				message: 'Password must be at least 6 characters!'
			})
			.max(25, {
				message: 'Password must be at most 25 characters!'
			}),
		profile: z.object(
			{
				image: z
					.string({
						required_error: 'Profile image is required!'
					})
					.url({
						message: 'Invalid profile image URL!'
					}),
				bio: z.string({
					required_error: 'Bio is required!',
					invalid_type_error: 'Bio must be a string!'
				}),
				age: z
					.number({
						required_error: 'Age is required!',
						invalid_type_error: 'Age must be a number!'
					})
					.int({
						message: 'Age must be an integer!'
					})
					.positive({
						message: 'Age must be a positive number!'
					})
			},
			{
				required_error: 'Profile data is required!'
			}
		)
	})
});

const loginUser = z.object({
	body: z.object({
		email: z
			.string({
				required_error: 'Email is required!'
			})
			.email({
				message: 'Invalid email address!'
			}),
		password: z.string({
			required_error: 'Password is required!'
		})
	})
});

const updateUserProfile = z.object({
	body: z.object({
		image: z
			.string()
			.url({
				message: 'Invalid profile image URL!'
			})
			.optional(),
		bio: z
			.string({
				invalid_type_error: 'Bio must be a string!'
			})
			.optional(),
		age: z
			.number({
				invalid_type_error: 'Age must be a number!'
			})
			.int({
				message: 'Age must be an integer!'
			})
			.positive({
				message: 'Age must be a positive number!'
			})
			.optional()
	})
});

const userValidationSchemas = {
	createUser,
	loginUser,
	updateUserProfile
};

export default userValidationSchemas;
