import { CreateRefreshToken } from "../repositories/RefreshTokenRepository";

export class RefreshToken{
    constructor(
        public readonly id: string,
        public readonly revoked: boolean,
        public readonly userId: string,
        public readonly expiresAt: Date
    ) { }

    isExpired():boolean{
        return this.expiresAt < new Date();
    }
}