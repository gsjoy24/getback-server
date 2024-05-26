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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const createToken_1 = __importDefault(require("../../utils/createToken"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const user_constant_1 = require("./user.constant");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // i am separating the role to prevent create a admin from here. the admin will get created from the seed file or from the admin panel
    const { role, password, profile } = userData, restUserData = __rest(userData, ["role", "password", "profile"]);
    const hashedPassword = yield bcrypt_1.default.hash(password, config_1.default.pass_salt);
    const modifiedUserData = Object.assign(Object.assign({}, restUserData), { password: hashedPassword });
    const newUser = yield prisma_1.default.$transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield trx.user.create({
            data: modifiedUserData,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }
        });
        const userProfile = yield trx.userProfile.create({
            data: Object.assign(Object.assign({}, profile), { userId: user.id })
        });
        return Object.assign(Object.assign({}, user), { profile: userProfile });
    }));
    return newUser;
});
const getAllUsers = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = query, restQueryData = __rest(query, ["searchTerm"]);
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (Number(page) - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    const conditions = [];
    if (searchTerm) {
        conditions.push({
            OR: user_constant_1.userSearchableFields.map((field) => ({
                [field]: { contains: searchTerm, mode: 'insensitive' }
            }))
        });
    }
    if (Object.keys(restQueryData).length) {
        conditions.push({
            AND: Object.keys(restQueryData).map((key) => ({
                [key]: {
                    equals: restQueryData[key]
                }
            }))
        });
    }
    const users = yield prisma_1.default.user.findMany({
        where: { AND: conditions },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    });
    const total = yield prisma_1.default.user.count({
        where: { AND: conditions }
    });
    return {
        meta: {
            limit,
            page,
            total
        },
        users
    };
});
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
        role: user.role
    };
    const token = (0, createToken_1.default)(userData, config_1.default.accessSecret, config_1.default.accessSecretExp);
    const refreshToken = (0, createToken_1.default)(userData, config_1.default.refreshSecret, config_1.default.refreshSecretExp);
    return Object.assign(Object.assign({ name: user.name }, userData), { token,
        refreshToken });
});
const getUserProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const lostItems = yield prisma_1.default.lostItem.findMany({
        where: {
            userId
        },
        take: 5,
        orderBy: {
            createdAt: 'desc'
        }
    });
    const foundItems = yield prisma_1.default.foundItem.findMany({
        where: {
            userId
        },
        take: 5,
        orderBy: {
            createdAt: 'desc'
        }
    });
    const claimedItems = yield prisma_1.default.claim.findMany({
        where: {
            userId
        },
        take: 5,
        orderBy: {
            createdAt: 'desc'
        }
    });
    const userProfile = yield prisma_1.default.userProfile.findUniqueOrThrow({
        where: {
            userId
        },
        include: {
            user: true
        }
    });
    return Object.assign(Object.assign({}, userProfile), { lostItems,
        foundItems,
        claimedItems });
});
const updateUserProfile = (userId, profileData) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = yield prisma_1.default.userProfile.update({
        where: {
            userId
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true
                }
            }
        },
        data: profileData
    });
    return userProfile;
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
const UserServices = {
    createUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    toggleUserRole,
    toggleUserStatus,
    getAllUsers
};
exports.default = UserServices;
