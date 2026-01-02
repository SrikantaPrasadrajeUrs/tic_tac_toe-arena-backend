import { access } from "node:fs";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { ByCryptHasher } from "../../infrastructure/auth/BycryptHasher";
import { JwtService } from "../../infrastructure/auth/JwtService";
import { RefreshTokenRepository } from "../../domain/repositories/RefreshTokenRepository";
import { randomUUID } from "node:crypto";

const FIFTEEN_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000;
export class LoginUser{
    constructor(
        private users: UserRepository,
        private hasher: ByCryptHasher,
        private jwt: JwtService,
        private refreshTokenRepo: RefreshTokenRepository
    ){}

    async execute(email: string, password: string){
        const user = await this.users.findByEmail(email);
        if(!user) throw new Error("Invalid credentials");
        const ok = this.hasher.compare(password, user.passwordHash);
        if(!ok) throw new Error("Invalid credentials");
        const accessToken= this.jwt.signAccessToken({sub : user.id});
        const refreshToken = this.jwt.signRefreshToken({sub: user.id})
        const data = {
            id: randomUUID(),
            token: refreshToken,
            expiresAt: new Date(Date.now()+FIFTEEN_DAYS_IN_MS),
            userId: user.id
        };
        await this.refreshTokenRepo.create(data, this.hasher);

        return {
            accessToken,
            refreshToken,
            user:{
                id: user.id,
                email: user.email
            }
        }
    }
}