"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '/.env') });
exports.default = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    pass_salt: Number(process.env.PASS_SAIL),
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessSecretExp: process.env.JWT_ACCESS_SECRET_EXPIRATION,
    refreshSecretExp: process.env.JWT_REFRESH_EXPIRATION
};
