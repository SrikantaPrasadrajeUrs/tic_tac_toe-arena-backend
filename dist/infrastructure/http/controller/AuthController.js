"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const RegisterUser_1 = require("../../../application/use-cases/RegisterUser");
const PrismaUserRepository_1 = require("../../db/PrismaUserRepository");
const BycryptHasher_1 = require("../../auth/BycryptHasher");
const asyncHandler_1 = require("../asyncHandler");
const LoginUser_1 = require("../../../application/use-cases/LoginUser");
const JwtService_1 = require("../../auth/JwtService");
const PrismaRefreshTokenRepository_1 = require("../../db/PrismaRefreshTokenRepository");
const RefreshTokenHasher_1 = require("../../auth/RefreshTokenHasher");
const RefreshAccessToken_1 = require("../../../application/use-cases/RefreshAccessToken");
const userRepo = new PrismaUserRepository_1.PrismaUserRepository();
const hasher = new BycryptHasher_1.ByCryptHasher();
const jwtService = new JwtService_1.JwtService();
const refreshTokenHasher = new RefreshTokenHasher_1.RefreshTokenHasher(process.env.JWT_REFRESH_SECRET);
const tokenRepo = new PrismaRefreshTokenRepository_1.PrismaRefreshTokenRepository(refreshTokenHasher);
class AuthController {
}
exports.AuthController = AuthController;
_a = AuthController;
AuthController.registerUser = new RegisterUser_1.RegisterUser(userRepo, hasher);
AuthController.loginUser = new LoginUser_1.LoginUser(userRepo, hasher, refreshTokenHasher, jwtService, tokenRepo);
AuthController.refreshToken = new RefreshAccessToken_1.RefreshAccessToken(jwtService, tokenRepo, refreshTokenHasher);
AuthController.register = (0, asyncHandler_1.aysncHandler)(async (req, res) => {
    const { email, password } = req.body;
    const user = await _a.registerUser.execute(email, password);
    res.status(201).json({
        id: user.id,
        email: user.email
    });
});
AuthController.login = (0, asyncHandler_1.aysncHandler)(async (req, res) => {
    const { email, password } = req.body;
    const user = await _a.loginUser.execute(email, password);
    res.status(200).json({
        ...user
    });
});
AuthController.refresh = (0, asyncHandler_1.aysncHandler)(async (req, res) => {
    const { refreshToken } = req.body;
    const tokenData = await _a.refreshToken.execute(refreshToken);
    return res.status(200).json({ ...tokenData });
});
