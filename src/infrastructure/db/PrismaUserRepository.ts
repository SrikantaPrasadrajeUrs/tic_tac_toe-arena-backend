import { prisma } from "./prisma";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";


export class PrismaUserRepository implements UserRepository {
    async create(user: User): Promise<User> {
        const u = await prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                passwordHash: user.passwordHash
            }
        });
        return new User(u.id, u.email, u.passwordHash);
    }
    async findByEmail(email: string): Promise<User | null> {
        const u = await prisma.user.findUnique({ where: { email } });
        return u ? new User(u.id, u.email, u.passwordHash) : null
    }
    async findById(id: string): Promise<User | null> {
        const u = await prisma.user.findUnique({ where: { id } })
        return u ? new User(u.id, u.email, u.passwordHash) : null;
    }

}