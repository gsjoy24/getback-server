"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createCategory = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: 'Name must be a string',
            required_error: 'Name of the category is required'
        })
            .min(3, {
            message: 'Name of the category must be at least 3 characters long'
        })
            .max(30, {
            message: 'Name of the category must be at most 30 characters long'
        })
    })
});
const CategoryValidation = {
    createCategory
};
exports.default = CategoryValidation;
