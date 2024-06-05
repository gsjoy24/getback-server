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
const client_1 = require("@prisma/client");
const emailSender_1 = __importDefault(require("../../utils/emailSender"));
const emailTemp_1 = __importDefault(require("../../utils/emailTemp"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const claim_constant_1 = require("./claim.constant");
const claimItem = (claimItem, userData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(claimItem, userData);
    // check if the the item exists
    yield prisma_1.default.foundItem.findUniqueOrThrow({
        where: {
            id: claimItem.foundItemId
        }
    });
    // check if the user has already claimed the item
    const existingClaim = yield prisma_1.default.claim.findFirst({
        where: {
            userId: userData.id,
            foundItemId: claimItem.foundItemId
        }
    });
    if (existingClaim) {
        throw new Error('You have already claimed this item');
    }
    const newClaimItem = yield prisma_1.default.claim.create({
        data: Object.assign(Object.assign({}, claimItem), { userId: userData.id })
    });
    return newClaimItem;
});
const getClaims = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = query, restQueryData = __rest(query, ["searchTerm"]);
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (Number(page) - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    const conditions = [];
    if (searchTerm) {
        conditions.push({
            OR: claim_constant_1.claimSearchableFields.map((field) => ({
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
    const claims = yield prisma_1.default.claim.findMany({
        where: { AND: conditions },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true
                }
            },
            foundItem: true
        }
    });
    const total = yield prisma_1.default.claim.count({
        where: { AND: conditions }
    });
    return {
        meta: {
            limit,
            page,
            total
        },
        claims
    };
});
const getClaim = (claimId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.claim.findUniqueOrThrow({
        where: {
            id: claimId
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true
                }
            },
            foundItem: true
        }
    });
});
const getMyClaims = (userId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (Number(page) - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    const claims = yield prisma_1.default.claim.findMany({
        where: {
            userId
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            foundItem: true
        }
    });
    const total = yield prisma_1.default.claim.count({
        where: {
            userId
        }
    });
    return {
        meta: {
            limit,
            page,
            total
        },
        claims
    };
});
const updateClaim = (claimId, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    // status and response can only be updated by an admin or the user who reported the found item
    const { status, response } = payload, restData = __rest(payload, ["status", "response"]);
    if (status && response) {
        throw new Error('You are not authorized to update the status or response of this claim');
    }
    const data = yield prisma_1.default.claim.findUniqueOrThrow({
        where: {
            id: claimId
        }
    });
    if (data.userId !== user.id) {
        throw new Error('You are not authorized to update this claim');
    }
    if (data.status === client_1.ClaimStatus.REJECTED || data.status === client_1.ClaimStatus.APPROVED) {
        throw new Error('You can only update a pending claim!');
    }
    const claim = yield prisma_1.default.claim.update({
        where: {
            id: claimId
        },
        data: Object.assign({}, restData)
    });
    return claim;
});
const updateStatus = (claimId, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const claim = yield prisma_1.default.claim.findUniqueOrThrow({
        where: {
            id: claimId
        },
        include: {
            foundItem: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true
                }
            }
        }
    });
    if (claim.foundItem.userId !== user.id && user.role !== 'ADMIN') {
        throw new Error('You are not authorized to update the status of this claim');
    }
    if (claim.status !== client_1.ClaimStatus.PENDING) {
        throw new Error('You can only update the status of a pending claim');
    }
    yield (0, emailSender_1.default)('Claim Status Notification', claim.user.email, (0, emailTemp_1.default)(claim.user.name, payload));
    const updatedClaim = yield prisma_1.default.claim.update({
        where: {
            id: claimId
        },
        data: Object.assign({}, payload)
    });
    return updatedClaim;
});
const deleteClaim = (claimId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.claim.findUniqueOrThrow({
        where: {
            id: claimId
        }
    });
    if (data.userId !== userData.id && userData.role !== 'ADMIN') {
        throw new Error('You are not authorized to delete this claim');
    }
    yield prisma_1.default.claim.delete({
        where: {
            id: claimId
        }
    });
});
const claimServices = {
    claimItem,
    getClaims,
    getClaim,
    updateClaim,
    updateStatus,
    deleteClaim,
    getMyClaims
};
exports.default = claimServices;
