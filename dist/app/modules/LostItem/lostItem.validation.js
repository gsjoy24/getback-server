"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const ReportLostItem = zod_1.z.object({
    body: zod_1.z.object({
        categoryId: zod_1.z.string({
            required_error: 'Category id is required'
        }),
        itemName: zod_1.z
            .string({
            required_error: 'Found item name is required'
        })
            .min(5, {
            message: 'Found item name must be at least 5 characters long'
        }),
        description: zod_1.z
            .string({
            required_error: 'Description is required'
        })
            .min(5, {
            message: 'Description must be at least 5 characters long'
        }),
        location: zod_1.z.string({
            required_error: 'Location is required'
        }),
        pictures: zod_1.z.array(zod_1.z.string()),
        lostDate: zod_1.z.string({
            required_error: 'Lost date is required'
        })
    })
});
const UpdateLostItem = zod_1.z.object({
    body: zod_1.z.object({
        categoryId: zod_1.z.string().optional(),
        itemName: zod_1.z
            .string()
            .min(5, {
            message: 'Found item name must be at least 5 characters long'
        })
            .optional(),
        description: zod_1.z
            .string()
            .min(5, {
            message: 'Description must be at least 5 characters long'
        })
            .optional(),
        location: zod_1.z.string().optional(),
        pictures: zod_1.z.array(zod_1.z.string()).optional(),
        lostDate: zod_1.z.string().optional(),
        isFound: zod_1.z.boolean().optional()
    })
});
const LostValidations = {
    ReportLostItem,
    UpdateLostItem
};
exports.default = LostValidations;
