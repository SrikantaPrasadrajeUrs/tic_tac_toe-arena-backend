"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
const node_crypto_1 = require("node:crypto");
const FIFTEEN_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000;
class LoginUser {
    constructor(users, hasher, tokenHasher, jwt, refreshTokenRepo) {
        this.users = users;
        this.hasher = hasher;
        this.tokenHasher = tokenHasher;
        this.jwt = jwt;
        this.refreshTokenRepo = refreshTokenRepo;
    }
    async execute(email, password) {
        const user = await this.users.findByEmail(email);
        if (!user)
            throw new Error("Invalid credentials");
        const ok = await this.hasher.compare(password, user.passwordHash);
        if (!ok)
            throw new Error("Invalid credentials");
        const refreshTokenId = (0, node_crypto_1.randomUUID)();
        const accessToken = this.jwt.signAccessToken({ sub: user.id });
        const refreshToken = this.jwt.signRefreshToken({ sub: user.id, jti: refreshTokenId });
        const data = {
            id: refreshTokenId,
            token: refreshToken,
            expiresAt: new Date(Date.now() + FIFTEEN_DAYS_IN_MS),
            userId: user.id
        };
        await this.refreshTokenRepo.create(data, this.tokenHasher);
        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email
            }
        };
    }
}
exports.LoginUser = LoginUser;
