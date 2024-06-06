"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const userRoles_1 = __importDefault(require("../../utils/userRoles"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const auth_validation_1 = __importDefault(require("./auth.validation"));
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.default.loginUser), auth_controller_1.default.loginUser);
router.put('/toggle-user-role/:id', (0, auth_1.default)(userRoles_1.default.ADMIN), auth_controller_1.default.toggleUserRole);
router.put('/toggle-user-status/:id', (0, auth_1.default)(userRoles_1.default.ADMIN), auth_controller_1.default.toggleUserStatus);
router.put('/change-password', (0, auth_1.default)(userRoles_1.default.ADMIN, userRoles_1.default.USER), (0, validateRequest_1.default)(auth_validation_1.default.changePassword), auth_controller_1.default.changeUserPassword);
const authRoutes = router;
exports.default = authRoutes;
