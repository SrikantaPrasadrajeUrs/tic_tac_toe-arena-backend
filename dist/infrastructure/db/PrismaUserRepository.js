"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const prisma_1 = require("./prisma");
const User_1 = require("../../domain/entities/User");
class PrismaUserRepository {
    async create(user) {
        const u = await prisma_1.prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                passwordHash: user.passwordHash
            }
        });
        return new User_1.User(u.id, u.email, u.passwordHash);
    }
    async findByEmail(email) {
        const u = await prisma_1.prisma.user.findUnique({ where: { email } });
        return u ? new User_1.User(u.id, u.email, u.passwordHash) : null;
    }
    async findById(id) {
        const u = await prisma_1.prisma.user.findUnique({ where: { id } });
        return u ? new User_1.User(u.id, u.email, u.passwordHash) : null;
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
