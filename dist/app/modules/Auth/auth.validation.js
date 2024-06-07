"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const loginUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required!'
        })
            .email({
            message: 'Invalid email address!'
        }),
        password: zod_1.z.string({
            required_error: 'Password is required!'
        })
    })
});
const changePassword = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: 'Old password is required!'
        }),
        newPassword: zod_1.z.string({
            required_error: 'New password is required!'
        })
    })
});
const deleteAccount = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: 'Password is required!'
        })
    })
});
const AuthValidation = {
    loginUser,
    changePassword,
    deleteAccount
};
exports.default = AuthValidation;
