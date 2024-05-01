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

const ClaimValidations = {
	createClaimSchema
};

export default ClaimValidations;
