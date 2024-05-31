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
const createNewSubscriber = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.newsLetterEmails.findUnique({
        where: {
            email
        }
    });
    if (isExist) {
        throw new Error('You are already subscribed!');
    }
    const newSubscriber = yield prisma_1.default.newsLetterEmails.create({
        data: {
            email
        }
    });
    return newSubscriber;
});
const getSubscribers = () => __awaiter(void 0, void 0, void 0, function* () {
    const subscribers = yield prisma_1.default.newsLetterEmails.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return subscribers;
});
const unsubscribeSubscriber = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.newsLetterEmails.findUnique({
        where: {
            email
        }
    });
    if (!isExist) {
        throw new Error('You are not subscribed!');
    }
    const deletedSubscriber = yield prisma_1.default.newsLetterEmails.delete({
        where: {
            email
        }
    });
    return deletedSubscriber;
});
const NewsLetterSubscribeServices = {
    createNewSubscriber,
    getSubscribers,
    unsubscribeSubscriber
};
exports.default = NewsLetterSubscribeServices;
