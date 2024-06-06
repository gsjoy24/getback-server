"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required!'
        })
            .min(3, {
            message: 'Name must be at least 3 characters!'
        })
            .max(255),
        username: zod_1.z.string({
            required_error: 'Username is required!'
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required!'
        })
            .email({
            message: 'Invalid email address!'
        }),
        phone: zod_1.z
            .string({
            required_error: 'Phone number is required!'
        })
            .min(11, {
            message: 'Phone number must be at least 10 characters!'
        })
            .max(14, {
            message: 'Phone number must be at most 15 characters!'
        }),
        password: zod_1.z
            .string({
            required_error: 'Password is required!'
        })
            .min(6, {
            message: 'Password must be at least 6 characters!'
        })
            .max(25, {
            message: 'Password must be at most 25 characters!'
        }),
        profile: zod_1.z.object({
            image: zod_1.z
                .string({
                required_error: 'Profile image is required!'
            })
                .url({
                message: 'Invalid profile image URL!'
            }),
            bio: zod_1.z.string({
                required_error: 'Bio is required!',
                invalid_type_error: 'Bio must be a string!'
            }),
            age: zod_1.z
                .number({
                required_error: 'Age is required!',
                invalid_type_error: 'Age must be a number!'
            })
                .int({
                message: 'Age must be an integer!'
            })
                .positive({
                message: 'Age must be a positive number!'
            })
        }, {
            required_error: 'Profile data is required!'
        })
    })
});
const updateUserProfile = zod_1.z.object({
    body: zod_1.z.object({
        image: zod_1.z
            .string()
            .url({
            message: 'Invalid profile image URL!'
        })
            .optional(),
        bio: zod_1.z
            .string({
            invalid_type_error: 'Bio must be a string!'
        })
            .optional(),
        age: zod_1.z
            .number({
            invalid_type_error: 'Age must be a number!'
        })
            .int({
            message: 'Age must be an integer!'
        })
            .positive({
            message: 'Age must be a positive number!'
        })
            .optional()
    })
});
const userValidationSchemas = {
    createUser,
    updateUserProfile
};
exports.default = userValidationSchemas;
