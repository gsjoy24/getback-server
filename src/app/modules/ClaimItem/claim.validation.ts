import { z } from 'zod';

const createClaimSchema = z.object({
	body: z.object({
		foundItemId: z.string({
			required_error: 'Found item id is required'
		}),
		pictures: z.array(z.string(), {
			required_error: 'Pictures are required'
		}),
		driveUrl: z
			.string()
			.url({
				message: 'Invalid drive url'
			})
			.optional(),
		description: z.string({
			required_error: 'Distinguishing features is required'
		}),
		lostDate: z.string({
			required_error: 'Lost date is required'
		})
	})
});

const updateClaimSchema = z.object({
	body: z.object({
		pictures: z.array(z.string()).optional(),
		driveUrl: z
			.string()
			.url({
				message: 'Invalid drive url'
			})
			.optional(),
		description: z.string().optional(),
		lostDate: z.string().optional()
	})
});

const updateClaimStatus = z.object({
	body: z.object({
		response: z.string({
			required_error: 'Response message is required'
		}),
		status: z.enum(['PENDING', 'APPROVED', 'REJECTED'], {
			required_error: 'Status is required',
			invalid_type_error: 'Status must be one of PENDING, APPROVED or REJECTED'
		})
	})
});

const ClaimValidations = {
	createClaimSchema,
	updateClaimSchema,
	updateClaimStatus
};

export default ClaimValidations;
