"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
const node_crypto_1 = require("node:crypto");
const User_1 = require("../../domain/entities/User");
class RegisterUser {
    constructor(users, hasher) {
        this.users = users;
        this.hasher = hasher;
    }
    async execute(email, password) {
        const existing = await this.users.findByEmail(email);
        if (existing) {
            throw new Error("User already exists");
        }
        const hash = await this.hasher.hash(password);
        return this.users.create(new User_1.User((0, node_crypto_1.randomUUID)(), email, hash));
    }
}
exports.RegisterUser = RegisterUser;
