"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const globalErrorHandler = (err, req, res, next) => {
    var _a, _b;
    const modifiedError = {
        success: false,
        message: (err === null || err === void 0 ? void 0 : err.message) || 'Something went wrong!',
        errorDetails: err
    };
    let message = err.message || 'Something went wrong!';
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ZodError') {
        modifiedError.message = (_a = err === null || err === void 0 ? void 0 : err.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => issue.message).join(', ');
    }
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        message = 'Invalid input data!';
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
            message = 'Record not found!';
        }
        else if (err.code === 'P2002') {
            message = `${(_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.target} already exists!`;
        }
    }
    res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json(modifiedError);
};
exports.default = globalErrorHandler;
