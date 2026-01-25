import { RefreshToken } from "../../domain/entities/RefreshToken";
import { RefreshTokenRepository } from "../../domain/repositories/RefreshTokenRepository";
import { RefreshTokenHasher } from "../auth/RefreshTokenHasher";
import { prisma } from "./prisma";

export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
    constructor(
        private readonly hasher:RefreshTokenHasher
    ){}
    async create(data: {
        id: string,
        userId: string,
        token: string,
        expiresAt: Date
    }): Promise<void> {
        const r = await prisma.refreshToken.create({
            data: {
                id: data.id,
                userId: data.userId,
                token: this.hasher.hash(data.token),
                expiresAt: data.expiresAt
            }
        });
    }

    async findValid(id: string, token: string): Promise<RefreshToken | null> {
        const r = await prisma.refreshToken.findFirst({
            where: {
                id: id,
                token: this.hasher.hash(token),
                revoked: false,
                expiresAt: { gt: new Date() }
            }
        });
        return r? new RefreshToken(r.id, r.revoked, r.userId, r.expiresAt): null;
    }

    async revoke(id: string): Promise<void> {
        await prisma.refreshToken.update({ where: { id: id }, data: { revoked: true } });
    }
}