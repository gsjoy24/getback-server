import { z } from 'zod';

const createClaimSchema = z.object({
	body: z.object({
		foundItemId: z.string({
			required_error: 'Found item id is required'
		}),
		distinguishingFeatures: z.string({
			required_error: 'Distinguishing features is required'
		}),
		lostDate: z.string({
			required_error: 'Lost date is required'
		})
	})
});

const updateClaimSchema = z.object({
	body: z.object({
		status: z.enum(['PENDING', 'APPROVED', 'REJECTED'], {
			required_error: 'Status is required',
			invalid_type_error: 'Status must be one of PENDING, APPROVED or REJECTED'
		})
	})
});
const ClaimValidations = {
	createClaimSchema,
	updateClaimSchema
};

export default ClaimValidations;
