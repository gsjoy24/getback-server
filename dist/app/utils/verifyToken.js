"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (token, secret) => {
    let decodedData;
    try {
        decodedData = jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        throw new Error('You are not authorized!');
    }
    return decodedData;
};
exports.default = verifyToken;
