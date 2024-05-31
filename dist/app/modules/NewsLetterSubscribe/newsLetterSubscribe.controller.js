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
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const newsLetterSubscribe_service_1 = __importDefault(require("./newsLetterSubscribe.service"));
const createNewSubscriber = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const newSubscriber = yield newsLetterSubscribe_service_1.default.createNewSubscriber(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'You have successfully subscribed to our newsletter!',
        data: newSubscriber
    });
}));
const getSubscribers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subscribers = yield newsLetterSubscribe_service_1.default.getSubscribers();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Subscribers fetched successfully',
        data: subscribers
    });
}));
const unsubscribeSubscriber = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    yield newsLetterSubscribe_service_1.default.unsubscribeSubscriber(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.NO_CONTENT,
        success: true,
        message: 'You have successfully unsubscribed from our newsletter!'
    });
}));
const NewsLetterSubscribeControllers = {
    createNewSubscriber,
    getSubscribers,
    unsubscribeSubscriber
};
exports.default = NewsLetterSubscribeControllers;
