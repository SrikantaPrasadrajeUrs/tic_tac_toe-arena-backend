"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenHasher = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
class RefreshTokenHasher {
    constructor(secret) {
        this.secret = secret;
    }
    hash(token) {
        return node_crypto_1.default.createHmac("sha256", this.secret).update(token).digest("hex");
    }
}
exports.RefreshTokenHasher = RefreshTokenHasher;
