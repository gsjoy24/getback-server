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
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const createToken_1 = __importDefault(require("../../utils/createToken"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email
        }
    });
    if (user.status === 'BLOCKED') {
        throw new Error('Your account is suspended!');
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Invalid password');
    }
    const userData = {
        id: user.id,
        email: user.email,
        phone: user.phone,
        username: user.username,
        role: user.role
    };
    const accessToken = (0, createToken_1.default)(userData, config_1.default.accessSecret, config_1.default.accessSecretExp);
    const refreshToken = (0, createToken_1.default)(userData, config_1.default.refreshSecret, config_1.default.refreshSecretExp);
    return Object.assign(Object.assign({ name: user.name }, userData), { accessToken,
        refreshToken });
});
const toggleUserRole = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    });
    const result = yield prisma_1.default.user.update({
        where: {
            id: userId
        },
        data: {
            role: user.role === 'USER' ? 'ADMIN' : 'USER'
        }
    });
    return result;
});
const toggleUserStatus = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    });
    const result = yield prisma_1.default.user.update({
        where: {
            id: userId
        },
        data: {
            status: user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE'
        }
    });
    return result;
});
const changeUserPassword = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    });
    const isPasswordMatch = yield bcrypt_1.default.compare(payload.oldPassword, user.password);
    if (!isPasswordMatch) {
        throw new Error('Password does not match!');
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, config_1.default.pass_salt);
    const result = yield prisma_1.default.user.update({
        where: {
            id: userId
        },
        data: {
            password: hashedPassword
        }
    });
    return;
});
const deleteAccount = (password, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    });
    const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Password does not match!');
    }
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.lostItem.deleteMany({
            where: {
                userId
            }
        });
        yield tx.claim.deleteMany({
            where: {
                userId
            }
        });
        yield tx.foundItem.deleteMany({
            where: {
                userId
            }
        });
        yield tx.userProfile.delete({
            where: {
                userId
            }
        });
        const res = yield tx.user.delete({
            where: {
                id: userId
            }
        });
        return res;
    }));
    return result;
});
const AuthServices = {
    loginUser,
    toggleUserRole,
    toggleUserStatus,
    changeUserPassword,
    deleteAccount
};
exports.default = AuthServices;
