"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const notFound = (req, res) => {
    res.status(http_status_1.default.FORBIDDEN).json({
        status: false,
        message: 'API not found!',
        errorDetails: {
            path: req.originalUrl,
            message: 'You are trying to access an API that does not exist!'
        }
    });
};
exports.default = notFound;
