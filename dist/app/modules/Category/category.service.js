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
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createCategory = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.category.findUnique({
        where: {
            name: categoryData.name
        }
    });
    if (isExist) {
        throw new Error('Category already exist!');
    }
    const newCategory = yield prisma_1.default.category.create({
        data: categoryData
    });
    return newCategory;
});
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield prisma_1.default.category.findMany({
        orderBy: {
            name: 'asc'
        }
    });
    return categories;
});
const updateCategory = (categoryId, categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.category.findUniqueOrThrow({
        where: {
            id: categoryId
        }
    });
    const updatedCategory = yield prisma_1.default.category.update({
        where: {
            id: categoryId
        },
        data: categoryData
    });
    return updatedCategory;
});
const deleteCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCategory = yield prisma_1.default.category.delete({
        where: {
            id: categoryId
        }
    });
    return deletedCategory;
});
const CategoryServices = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
};
exports.default = CategoryServices;
