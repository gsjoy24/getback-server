"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const claim_controller_1 = __importDefault(require("./claim.controller"));
const claim_validation_1 = __importDefault(require("./claim.validation"));
const router = express_1.default.Router();
router.post('/claims', (0, auth_1.default)(), (0, validateRequest_1.default)(claim_validation_1.default.createClaimSchema), claim_controller_1.default.claimItem);
router.get('/claims', (0, auth_1.default)(), claim_controller_1.default.getClaims);
router.patch('/claims/:claimId', (0, auth_1.default)(), (0, validateRequest_1.default)(claim_validation_1.default.updateClaimSchema), claim_controller_1.default.updateStatus);
const ClaimRoutes = router;
exports.default = ClaimRoutes;
