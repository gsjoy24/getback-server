"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_controller_1 = __importDefault(require("./category.controller"));
const category_validation_1 = __importDefault(require("./category.validation"));
const router = express_1.default.Router();
router.post('/found-item-categories', (0, validateRequest_1.default)(category_validation_1.default.createCategory), (0, auth_1.default)(), category_controller_1.default.createCategory);
const CategoryRoutes = router;
exports.default = CategoryRoutes;
