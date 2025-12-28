import { RegisterUser } from "../../../application/use-cases/RegisterUser";
import { PrismaUserRepository } from "../../db/PrismaUserRepository";
import { ByCryptHasher } from "../../auth/BycryptHasher";
import { aysncHandler } from "../asyncHandler";
import { Request, Response } from "express";

const userRepo = new PrismaUserRepository();
const hasher = new ByCryptHasher();

export class AuthController {
    static register = aysncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const useCase = new RegisterUser(userRepo, hasher);
        const user = await useCase.execute(email, password);

        res.status(201).json({
            id: user.id,
            email: user.email
        });
    });
}