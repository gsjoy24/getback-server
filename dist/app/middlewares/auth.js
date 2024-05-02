"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const verifyToken_1 = __importDefault(require("../utils/verifyToken"));
const auth = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error('You are not authorized!');
        }
        const verifiedUser = (0, verifyToken_1.default)(token, config_1.default.accessSecret);
        const user = yield prisma_1.default.user.findUniqueOrThrow({ where: { email: verifiedUser.email } });
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
