"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("../modules/Auth/auth.routes"));
const category_routes_1 = __importDefault(require("../modules/Category/category.routes"));
const claim_routes_1 = __importDefault(require("../modules/ClaimItem/claim.routes"));
const foundItem_routes_1 = __importDefault(require("../modules/FoundItem/foundItem.routes"));
const lostItem_routes_1 = __importDefault(require("../modules/LostItem/lostItem.routes"));
const newsLetterSubscribe_router_1 = __importDefault(require("../modules/NewsLetterSubscribe/newsLetterSubscribe.router"));
const user_routes_1 = require("../modules/User/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_routes_1.userRoutes
    },
    {
        path: '/auth',
        route: auth_routes_1.default
    },
    {
        path: '/categories',
        route: category_routes_1.default
    },
    {
        path: '/found-items',
        route: foundItem_routes_1.default
    },
    {
        path: '/claims',
        route: claim_routes_1.default
    },
    {
        path: '/lost-items',
        route: lostItem_routes_1.default
    },
    {
        path: '/newsletter',
        route: newsLetterSubscribe_router_1.default
    }
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
