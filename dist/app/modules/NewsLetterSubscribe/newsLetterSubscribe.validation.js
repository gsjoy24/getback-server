"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const NewsLetterSubscribeValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            invalid_type_error: 'Email must be a string',
            required_error: 'Email is required'
        })
            .email({
            message: 'Please provide a valid email address!'
        })
    })
});
exports.default = NewsLetterSubscribeValidation;
