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
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const userRoles_1 = __importDefault(require("../utils/userRoles"));
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const adminData = {
        name: 'Gour Saha Joy',
        email: config_1.default.adminEmail,
        password: config_1.default.adminPass,
        role: userRoles_1.default.ADMIN
    };
    try {
        const findAdmin = yield prisma_1.default.user.findUnique({
            where: {
                email: adminData.email,
                role: userRoles_1.default.ADMIN
            }
        });
        const hashedPassword = yield bcrypt_1.default.hash(adminData === null || adminData === void 0 ? void 0 : adminData.password, config_1.default.pass_salt);
        const modifiedUserData = Object.assign(Object.assign({}, adminData), { password: hashedPassword });
        if (!findAdmin) {
            yield prisma_1.default.user.create({
                data: modifiedUserData
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = seedAdmin;
