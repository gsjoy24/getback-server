"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const userRoles_1 = __importDefault(require("../../utils/userRoles"));
const lostItem_controller_1 = __importDefault(require("./lostItem.controller"));
const lostItem_validation_1 = __importDefault(require("./lostItem.validation"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(userRoles_1.default.ADMIN, userRoles_1.default.USER), (0, validateRequest_1.default)(lostItem_validation_1.default.ReportLostItem), lostItem_controller_1.default.reportLostItem);
router.get('/', lostItem_controller_1.default.getLostItems);
router.get('/me', (0, auth_1.default)(userRoles_1.default.ADMIN, userRoles_1.default.USER), lostItem_controller_1.default.getMyLostItems);
router.get('/:lostItemId', lostItem_controller_1.default.getSingleLostItem);
router.put('/:lostItemId', (0, auth_1.default)(userRoles_1.default.ADMIN, userRoles_1.default.USER), (0, validateRequest_1.default)(lostItem_validation_1.default.UpdateLostItem), lostItem_controller_1.default.updateLostItem);
router.delete('/:lostItemId', (0, auth_1.default)(userRoles_1.default.ADMIN, userRoles_1.default.USER), lostItem_controller_1.default.deleteLostItem);
const LostItemRoutes = router;
exports.default = LostItemRoutes;
