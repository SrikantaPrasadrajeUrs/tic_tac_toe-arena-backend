import { RegisterUser } from "../../../application/use-cases/RegisterUser";
import { PrismaUserRepository } from "../../db/PrismaUserRepository";
import { ByCryptHasher } from "../../auth/BycryptHasher";
import { aysncHandler } from "../asyncHandler";
import { Request, Response } from "express";
import { LoginUser } from "../../../application/use-cases/LoginUser";
import { JwtService } from "../../auth/JwtService";
import { PrismaRefreshTokenRepository } from "../../db/PrismaRefreshTokenRepository";
import { RefreshTokenHasher } from "../../auth/RefreshTokenHasher";

const userRepo = new PrismaUserRepository();
const hasher = new ByCryptHasher();
const jwtService = new JwtService();
const refreshTokenHasher = new RefreshTokenHasher(process.env.JWT_REFRESH_SECRET!);
const tokenRepo = new PrismaRefreshTokenRepository(refreshTokenHasher);

export class AuthController {
    static registerUser = new RegisterUser(userRepo, hasher);
    static loginUser = new LoginUser(userRepo, hasher, jwtService, tokenRepo);

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
}