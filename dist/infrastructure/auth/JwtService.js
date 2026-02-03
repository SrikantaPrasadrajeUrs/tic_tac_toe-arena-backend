"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TTL = "15m";
const REFRESH_TTL = "7d";
class JwtService {
    signAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_TTL });
    }
    signRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_TTL });
    }
    verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
    }
}
exports.JwtService = JwtService;
