"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const userRoles_1 = __importDefault(require("../../utils/userRoles"));
const user_controller_1 = __importDefault(require("./user.controller"));
const user_validation_1 = __importDefault(require("./user.validation"));
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(user_validation_1.default.createUser), user_controller_1.default.createUser);
router.get('/', (0, auth_1.default)(userRoles_1.default.ADMIN), user_controller_1.default.getAllUsers);
router.get('/me', (0, auth_1.default)(userRoles_1.default.ADMIN, userRoles_1.default.USER), user_controller_1.default.getUserProfile);
router.put('/me', (0, auth_1.default)(userRoles_1.default.ADMIN, userRoles_1.default.USER), (0, validateRequest_1.default)(user_validation_1.default.updateUserProfile), user_controller_1.default.updateUserProfile);
exports.userRoutes = router;
