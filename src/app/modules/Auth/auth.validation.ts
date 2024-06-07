import { z } from 'zod';

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

const changePassword = z.object({
	body: z.object({
		oldPassword: z.string({
			required_error: 'Old password is required!'
		}),
		newPassword: z.string({
			required_error: 'New password is required!'
		})
	})
});

const deleteAccount = z.object({
	body: z.object({
		password: z.string({
			required_error: 'Password is required!'
		})
	})
});

const AuthValidation = {
	loginUser,
	changePassword,
	deleteAccount
};

export default AuthValidation;
