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
const pick_1 = __importDefault(require("../../utils/pick"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const lostItem_constant_1 = require("./lostItem.constant");
const lostItem_service_1 = __importDefault(require("./lostItem.service"));
const reportLostItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reportItem = yield lostItem_service_1.default.reportLostItem(req.body, req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Lost item reported successfully',
        data: reportItem
    });
}));
const getLostItems = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = (0, pick_1.default)(req.query, lostItem_constant_1.lostItemFilterAbleFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const { meta, lostItems } = yield lostItem_service_1.default.getLostItems(query, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Lost items fetched successfully',
        meta,
        data: lostItems
    });
}));
const getMyLostItems = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = (0, pick_1.default)(req.query, lostItem_constant_1.lostItemFilterAbleFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const { meta, lostItems } = yield lostItem_service_1.default.getMyLostItems(req.user, options, query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'My lost items fetched successfully',
        meta,
        data: lostItems
    });
}));
const getSingleLostItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lostItem = yield lostItem_service_1.default.getSingleLostItem(req.params.lostItemId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Lost item fetched successfully',
        data: lostItem
    });
}));
const updateLostItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedLostItem = yield lostItem_service_1.default.updateLostItem(req.params.lostItemId, req.body, req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Lost item updated successfully',
        data: updatedLostItem
    });
}));
const deleteLostItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield lostItem_service_1.default.deleteLostItem(req.params.lostItemId, req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Lost item deleted successfully'
    });
}));
const LostItemControllers = {
    reportLostItem,
    getLostItems,
    getSingleLostItem,
    updateLostItem,
    deleteLostItem,
    getMyLostItems
};
exports.default = LostItemControllers;
