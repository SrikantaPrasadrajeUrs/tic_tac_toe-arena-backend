"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshAccessToken = void 0;
const node_crypto_1 = require("node:crypto");
const FIFTEEN_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000;
class RefreshAccessToken {
    constructor(jwtService, refreshTokenRepository, tokenHasher) {
        this.jwtService = jwtService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.tokenHasher = tokenHasher;
    }
    async execute(refreshString) {
        const payload = this.jwtService.verifyRefreshToken(refreshString);
        const refreshToken = await this.refreshTokenRepository.findValid(payload.jti, refreshString);
        if (!refreshToken) {
            throw new Error("Invalid or revoked refresh token");
        }
        await this.refreshTokenRepository.revoke(payload.jti);
        const newJti = (0, node_crypto_1.randomUUID)();
        const newAccessToken = this.jwtService.signAccessToken({ sub: refreshToken.userId });
        const newRefreshToken = this.jwtService.signRefreshToken({ sub: refreshToken.userId, jti: newJti });
        await this.refreshTokenRepository.create({
            id: newJti,
            userId: refreshToken.userId,
            token: newRefreshToken,
            expiresAt: new Date(Date.now() + FIFTEEN_DAYS_IN_MS)
        }, this.tokenHasher);
        return { refreshToken: newRefreshToken, accessToken: newAccessToken };
    }
}
exports.RefreshAccessToken = RefreshAccessToken;
