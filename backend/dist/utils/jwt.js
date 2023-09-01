"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign({ userId: user.id, is_admin: user.is_admin }, process.env.JWT_ACCESS_SECRET || "", {
        expiresIn: '10h'
    });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(user, jti) {
    return jsonwebtoken_1.default.sign({
        userId: user.id,
        is_admin: user.is_admin,
        jti
    }, process.env.JWT_REFRESH_SECRET || "", {
        expiresIn: '8h',
    });
}
exports.generateRefreshToken = generateRefreshToken;
function generateTokens(user, jti) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);
    return {
        accessToken,
        refreshToken,
    };
}
exports.generateTokens = generateTokens;
