import { access } from "node:fs";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { ByCryptHasher } from "../../infrastructure/auth/BycryptHasher";
import { JwtService } from "../../infrastructure/auth/JwtService";


export class LoginUsers{
    constructor(
        private users: UserRepository,
        private hasher: ByCryptHasher,
        private jwt: JwtService
    ){}

    async execute(email: string, password: string){
        const user = await this.users.findByEmail(email);
        if(!user) throw new Error("Invalid credentials");
        const ok = this.hasher.compare(password, user.passwordHash);
        if(!ok) throw new Error("Invalid credentials");
        return {
            accessToken: this.jwt.signAccessToken({sub : user.id}),
            refreshToken: this.jwt.signRefreshToken({sub: user.id})
        }
    }
}