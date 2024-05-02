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
    yield prisma_1.default.foundItemCategory.findUniqueOrThrow({
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
    const conditions = [];
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
const reportItemServices = {
    ReportFoundItem,
    getFoundItems
};
exports.default = reportItemServices;
