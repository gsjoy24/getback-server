"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = __importDefault(require("./user.controller"));
const user_validation_1 = __importDefault(require("./user.validation"));
const router = express_1.default.Router();
router.get('/my-profile', (0, auth_1.default)(), user_controller_1.default.getUserProfile);
router.post('/register', (0, validateRequest_1.default)(user_validation_1.default.createUser), user_controller_1.default.createUser);
router.post('/login', (0, validateRequest_1.default)(user_validation_1.default.loginUser), user_controller_1.default.loginUser);
router.put('/my-profile', (0, auth_1.default)(), (0, validateRequest_1.default)(user_validation_1.default.updateUserProfile), user_controller_1.default.updateUserProfile);
exports.userRoutes = router;
