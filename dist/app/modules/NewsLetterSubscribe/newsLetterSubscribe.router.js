"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const newsLetterSubscribe_controller_1 = __importDefault(require("./newsLetterSubscribe.controller"));
const newsLetterSubscribe_validation_1 = __importDefault(require("./newsLetterSubscribe.validation"));
const router = express_1.default.Router();
router.post('/subscribe', (0, validateRequest_1.default)(newsLetterSubscribe_validation_1.default), newsLetterSubscribe_controller_1.default.createNewSubscriber);
router.get('/subscribers', newsLetterSubscribe_controller_1.default.getSubscribers);
router.delete('/unsubscribe', (0, validateRequest_1.default)(newsLetterSubscribe_validation_1.default), newsLetterSubscribe_controller_1.default.unsubscribeSubscriber);
const NewsLetterSubscribeRouter = router;
exports.default = NewsLetterSubscribeRouter;
