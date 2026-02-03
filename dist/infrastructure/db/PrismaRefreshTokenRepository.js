"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaRefreshTokenRepository = void 0;
const RefreshToken_1 = require("../../domain/entities/RefreshToken");
const prisma_1 = require("./prisma");
class PrismaRefreshTokenRepository {
    constructor(hasher) {
        this.hasher = hasher;
    }
    async create(data) {
        const r = await prisma_1.prisma.refreshToken.create({
            data: {
                id: data.id,
                userId: data.userId,
                token: this.hasher.hash(data.token),
                expiresAt: data.expiresAt
            }
        });
    }
    async findValid(id, token) {
        const r = await prisma_1.prisma.refreshToken.findFirst({
            where: {
                id: id,
                token: this.hasher.hash(token),
                revoked: false,
                expiresAt: { gt: new Date() }
            }
        });
        return r ? new RefreshToken_1.RefreshToken(r.id, r.revoked, r.userId, r.expiresAt) : null;
    }
    async revoke(id) {
        await prisma_1.prisma.refreshToken.update({ where: { id: id }, data: { revoked: true } });
    }
}
exports.PrismaRefreshTokenRepository = PrismaRefreshTokenRepository;
