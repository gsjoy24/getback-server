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
const lostItem_constant_1 = require("./lostItem.constant");
const reportLostItem = (reportItem, userData) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the category exists
    yield prisma_1.default.category.findUniqueOrThrow({
        where: {
            id: reportItem.categoryId
        }
    });
    const newReportItem = yield prisma_1.default.lostItem.create({
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
const getLostItems = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = query, restQueryData = __rest(query, ["searchTerm"]);
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (Number(page) - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    const conditions = [];
    if (searchTerm) {
        conditions.push({
            OR: lostItem_constant_1.lostItemSearchableFields.map((field) => ({
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
    const lostItems = yield prisma_1.default.lostItem.findMany({
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
            category: true
        }
    });
    const total = yield prisma_1.default.lostItem.count({
        where: { AND: conditions }
    });
    return {
        meta: {
            limit,
            page,
            total
        },
        lostItems
    };
});
const getMyLostItems = (user, options) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (Number(page) - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    const lostItems = yield prisma_1.default.lostItem.findMany({
        where: {
            userId: user.id
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            category: true
        }
    });
    const total = yield prisma_1.default.lostItem.count({
        where: {
            userId: user.id
        }
    });
    return {
        meta: {
            limit,
            page,
            total
        },
        lostItems
    };
});
const getSingleLostItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield prisma_1.default.lostItem.findUniqueOrThrow({
        where: {
            id
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
            category: true
        }
    });
    return item;
});
const deleteLostItem = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield prisma_1.default.lostItem.findUnique({
        where: {
            id
        }
    });
    if (!item) {
        throw new Error('Item not found!');
    }
    // admin can delete any item, user can delete only their items
    if (item.userId !== user.id && user.role !== 'ADMIN') {
        throw new Error('You are not authorized to delete this item!');
    }
    yield prisma_1.default.lostItem.delete({
        where: {
            id
        }
    });
    return true;
});
const updateLostItem = (id, data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield prisma_1.default.lostItem.findUnique({
        where: {
            id
        }
    });
    if (!item) {
        throw new Error('Item not found!');
    }
    // admin can update any item, user can update only their items
    if (item.userId !== user.id && user.role !== 'ADMIN') {
        throw new Error('You are not authorized to update this item!');
    }
    const updatedItem = yield prisma_1.default.lostItem.update({
        where: {
            id
        },
        data: Object.assign({}, data)
    });
    return updatedItem;
});
const LostItemServices = {
    reportLostItem,
    getLostItems,
    getSingleLostItem,
    updateLostItem,
    deleteLostItem,
    getMyLostItems
};
exports.default = LostItemServices;
