"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const { statusCode, success, message, data: responseData, meta } = data;
    const modifiedResponseData = {
        success,
        statusCode,
        message
    };
    meta && (modifiedResponseData.meta = meta);
    data && (modifiedResponseData.data = responseData);
    res.status(statusCode).json(modifiedResponseData);
};
exports.default = sendResponse;
