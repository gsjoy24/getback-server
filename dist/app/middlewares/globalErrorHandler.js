"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    var _a;
    const modifiedError = {
        status: false,
        message: (err === null || err === void 0 ? void 0 : err.message) || 'Something went wrong!',
        errorDetails: err
    };
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ZodError') {
        modifiedError.message = (_a = err === null || err === void 0 ? void 0 : err.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => issue.message).join(', ');
    }
    res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json(modifiedError);
};
exports.default = globalErrorHandler;
