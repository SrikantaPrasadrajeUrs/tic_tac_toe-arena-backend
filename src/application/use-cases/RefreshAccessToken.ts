import { randomUUID } from "node:crypto";
import { RefreshTokenRepository } from "../../domain/repositories/RefreshTokenRepository";
import { JwtService } from "../../infrastructure/auth/JwtService";
import { RefreshTokenHasher } from "../../infrastructure/auth/RefreshTokenHasher";
const FIFTEEN_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000;
export class RefreshAccessToken {
    constructor(
        private readonly jwtService: JwtService,
        private readonly refreshTokenRepository: RefreshTokenRepository,
        private readonly tokenHasher: RefreshTokenHasher
    ) {}

    async execute(refreshString: string) {
        const payload =  this.jwtService.verifyRefreshToken(refreshString);
        const refreshToken = await this.refreshTokenRepository.findValid(payload.jti, refreshString);
        if(!refreshToken){
            throw new Error("Invalid or revoked refresh token");
        }
        await this.refreshTokenRepository.revoke(payload.jti);
        const newJti = randomUUID();
        const newAccessToken = this.jwtService.signAccessToken({sub: refreshToken.userId});
        const newRefreshToken = this.jwtService.signRefreshToken({sub: refreshToken.userId, jti: newJti});
        await this.refreshTokenRepository.create({
            id: newJti,
            userId: refreshToken.userId,
            token: newRefreshToken,
            expiresAt: new Date(Date.now()+FIFTEEN_DAYS_IN_MS)
        }, this.tokenHasher);

        return { refreshToken: newRefreshToken, accessToken: newAccessToken };
    }
}