import { z } from 'zod';

const NewsLetterSubscribeValidation = z.object({
	body: z.object({
		email: z
			.string({
				invalid_type_error: 'Email must be a string',
				required_error: 'Email is required'
			})
			.email({
				message: 'Please provide a valid email address!'
			})
	})
});

export default NewsLetterSubscribeValidation;
