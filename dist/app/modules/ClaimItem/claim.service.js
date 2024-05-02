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
const prisma_1 = __importDefault(require("../../utils/prisma"));
const claimItem = (claimItem, userData) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the the item exists
    yield prisma_1.default.foundItem.findUniqueOrThrow({
        where: {
            id: claimItem.foundItemId
        }
    });
    const newClaimItem = yield prisma_1.default.claim.create({
        data: Object.assign(Object.assign({}, claimItem), { userId: userData.id })
    });
    return newClaimItem;
});
const getClaims = () => __awaiter(void 0, void 0, void 0, function* () {
    const claims = yield prisma_1.default.claim.findMany({
        include: {
            foundItem: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            createdAt: true,
                            updatedAt: true
                        }
                    },
                    category: true
                }
            }
        }
    });
    return claims;
});
const UpdateStatus = (claimId, status) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.claim.findUniqueOrThrow({
        where: {
            id: claimId
        }
    });
    const claim = yield prisma_1.default.claim.update({
        where: {
            id: claimId
        },
        data: {
            status
        }
    });
    return claim;
});
const claimServices = {
    claimItem,
    getClaims,
    UpdateStatus
};
exports.default = claimServices;
