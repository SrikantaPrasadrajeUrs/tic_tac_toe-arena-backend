import jwt from "jsonwebtoken";

const ACCESS_TTL = "15m";
const REFRESH_TTL = "7d";

export class JwtService{
    signAccessToken(payload: Object): string {
        return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: ACCESS_TTL })
    }

    signRefreshToken(payload: Object): string {
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: REFRESH_TTL })
    }

    verify(token: string):any{
        return jwt.verify(token, process.env.JWT_SECRET!);
    }
}