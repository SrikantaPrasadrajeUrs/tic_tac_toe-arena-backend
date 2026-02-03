"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, email, passwordHash) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
    }
}
exports.User = User;
