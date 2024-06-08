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
const prisma_1 = __importDefault(require("../../utils/prisma"));
const foundItem_constant_1 = require("./foundItem.constant");
const ReportFoundItem = (reportItem, userData) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the category exists
    yield prisma_1.default.category.findUniqueOrThrow({
        where: {
            id: reportItem.categoryId
        }
    });
    const newReportItem = yield prisma_1.default.foundItem.create({
        data: Object.assign(Object.assign({}, reportItem), { userId: userData.id }),
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true
                }
            },
            category: true
        }
    });
    return newReportItem;
});
const getFoundItems = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = query, restQueryData = __rest(query, ["searchTerm"]);
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (Number(page) - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    const conditions = [
        {
            isReturned: false
        }
    ];
    if (searchTerm) {
        conditions.push({
            OR: foundItem_constant_1.foundItemSearchableFields.map((field) => ({
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
    const foundItems = yield prisma_1.default.foundItem.findMany({
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
                    createdAt: true,
                    updatedAt: true
                }
            },
            category: true
        }
    });
    const total = yield prisma_1.default.foundItem.count({
        where: { AND: conditions }
    });
    return {
        meta: {
            limit,
            page,
            total
        },
        foundItems
    };
});
const getMyFoundItems = (user, query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = query, restQueryData = __rest(query, ["searchTerm"]);
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (Number(page) - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    const conditions = [
        {
            userId: user.id
        }
    ];
    if (searchTerm) {
        conditions.push({
            OR: foundItem_constant_1.foundItemSearchableFields.map((field) => ({
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
    const foundItems = yield prisma_1.default.foundItem.findMany({
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
                    createdAt: true,
                    updatedAt: true
                }
            },
            category: true
        }
    });
    const total = yield prisma_1.default.foundItem.count({
        where: { AND: conditions }
    });
    return {
        meta: {
            limit,
            page,
            total
        },
        foundItems
    };
});
const getFoundItemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundItem = yield prisma_1.default.foundItem.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true
                }
            },
            category: true,
            claim: true
        }
    });
    if (!foundItem) {
        throw new Error('Item not found');
    }
    return foundItem;
});
const deleteFoundItem = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const foundItem = yield prisma_1.default.foundItem.findUniqueOrThrow({
        where: { id }
    });
    if (foundItem.userId !== user.id) {
        throw new Error('You are not authorized to delete this item');
    }
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.claim.deleteMany({
            where: {
                foundItemId: id
            }
        });
        yield tx.foundItem.delete({
            where: { id }
        });
    }));
    return true;
});
const updateFoundItem = (id, data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const foundItem = yield prisma_1.default.foundItem.findUniqueOrThrow({
        where: { id }
    });
    if (foundItem.userId !== user.id && user.role !== 'ADMIN') {
        throw new Error('You are not authorized to update this item');
    }
    const { categoryId } = data, restData = __rest(data, ["categoryId"]);
    const modifiedData = Object.assign({}, restData);
    if (categoryId) {
        modifiedData.category = { connect: { id: categoryId } };
    }
    const updatedItem = yield prisma_1.default.foundItem.update({
        where: { id },
        data: modifiedData
    });
    return updatedItem;
});
const FoundItemServices = {
    ReportFoundItem,
    deleteFoundItem,
    updateFoundItem,
    getFoundItems,
    getFoundItemById,
    getMyFoundItems
};
exports.default = FoundItemServices;
