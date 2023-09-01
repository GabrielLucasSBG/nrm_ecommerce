import jwt from 'jsonwebtoken';

interface User {
    id: string;
    is_admin: number;
}

export function generateAccessToken(user: User): string {
    return jwt.sign({userId: user.id, is_admin: user.is_admin}, process.env.JWT_ACCESS_SECRET || "", {
        expiresIn: '10h'
    });
}

export function generateRefreshToken(user: User, jti: string): string {
    return jwt.sign({
        userId: user.id,
        is_admin: user.is_admin,
        jti
    }, process.env.JWT_REFRESH_SECRET || "", {
        expiresIn: '8h',
    });
}

export function generateTokens(user: User, jti: string): { accessToken: string, refreshToken: string } {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);

    return {
        accessToken,
        refreshToken,
    };
}