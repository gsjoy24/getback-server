"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const foundItem_controller_1 = __importDefault(require("./foundItem.controller"));
const foundItem_validation_1 = __importDefault(require("./foundItem.validation"));
const router = express_1.default.Router();
router.post('/found-items', (0, auth_1.default)(), (0, validateRequest_1.default)(foundItem_validation_1.default.ReportFoundItem), foundItem_controller_1.default.ReportFoundItem);
router.get('/found-items', (0, auth_1.default)(), foundItem_controller_1.default.getFoundItems);
const ReportItemRoutes = router;
exports.default = ReportItemRoutes;
