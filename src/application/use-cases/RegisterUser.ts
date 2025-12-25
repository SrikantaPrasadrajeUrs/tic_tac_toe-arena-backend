import { randomUUID } from "node:crypto";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { ByCryptHasher } from "../../infrastructure/auth/BycryptHasher";


class RegisterUser{
    constructor(
        private users: UserRepository,
        private hasher: ByCryptHasher
    ){}

    async execute(email: string, password: string){
        const existing = await this.users.findByEmail(email);
        if(existing){
            throw new Error("User already exists");
        }

        const hash = this.hasher.hash(password);
        return this.users.create(new User(randomUUID(), email, password));
    }
}