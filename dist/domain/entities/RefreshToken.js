"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
class RefreshToken {
    constructor(id, revoked, userId, expiresAt) {
        this.id = id;
        this.revoked = revoked;
        this.userId = userId;
        this.expiresAt = expiresAt;
    }
    isExpired() {
        return this.expiresAt < new Date();
    }
}
exports.RefreshToken = RefreshToken;
