import { RegisterUser } from "../../../application/use-cases/RegisterUser";
import { PrismaUserRepository } from "../../db/PrismaUserRepository";
import { ByCryptHasher } from "../../auth/BycryptHasher";
import { aysncHandler } from "../asyncHandler";
import { Request, Response } from "express";
import { LoginUser } from "../../../application/use-cases/LoginUser";
import { JwtService } from "../../auth/JwtService";
import { PrismaRefreshTokenRepository } from "../../db/PrismaRefreshTokenRepository";
import { RefreshTokenHasher } from "../../auth/RefreshTokenHasher";
import { RefreshAccessToken } from "../../../application/use-cases/RefreshAccessToken";

const userRepo = new PrismaUserRepository();
const hasher = new ByCryptHasher();
const jwtService = new JwtService();
const refreshTokenHasher = new RefreshTokenHasher(process.env.JWT_REFRESH_SECRET!);
const tokenRepo = new PrismaRefreshTokenRepository(refreshTokenHasher);

export class AuthController {
    static readonly registerUser = new RegisterUser(userRepo, hasher);
    static readonly loginUser = new LoginUser(userRepo, hasher, refreshTokenHasher, jwtService, tokenRepo);
    static readonly refreshToken = new RefreshAccessToken(jwtService, tokenRepo, refreshTokenHasher);

    static register = aysncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await AuthController.registerUser.execute(email, password);

        res.status(201).json({
            id: user.id,
            email: user.email
        });
    });

    static login = aysncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await this.loginUser.execute(email, password);
        res.status(200).json({
            ...user
        })
    });

    static refresh = aysncHandler(async (req: Request, res: Response) => {
        const { refreshToken } = req.body;
        const tokenData = await this.refreshToken.execute(refreshToken);
        return res.status(200).json({...tokenData});
    });
}