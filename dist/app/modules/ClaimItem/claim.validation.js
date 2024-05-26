"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createClaimSchema = zod_1.z.object({
    body: zod_1.z.object({
        foundItemId: zod_1.z.string({
            required_error: 'Found item id is required'
        }),
        description: zod_1.z.string({
            required_error: 'Distinguishing features is required'
        }),
        lostDate: zod_1.z.string({
            required_error: 'Lost date is required'
        })
    })
});
const updateClaimSchema = zod_1.z.object({
    body: zod_1.z.object({
        description: zod_1.z.string().optional(),
        lostDate: zod_1.z.string().optional()
    })
});
const updateClaimStatus = zod_1.z.object({
    body: zod_1.z.object({
        response: zod_1.z.string({
            required_error: 'Response message is required'
        }),
        status: zod_1.z.enum(['PENDING', 'APPROVED', 'REJECTED'], {
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
exports.default = ClaimValidations;
