"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const ReportFoundItem = zod_1.z.object({
    body: zod_1.z.object({
        categoryId: zod_1.z.string({
            required_error: 'Category id is required'
        }),
        foundItemName: zod_1.z
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
        })
    })
});
const ReportItemValidations = {
    ReportFoundItem
};
exports.default = ReportItemValidations;
