import {db} from '../../utils/db';
import {hashToken} from '../../utils/hashToken';

export function addRefreshTokenToWhitelist({jti, refreshToken, userId}: {
    jti: string,
    refreshToken: string,
    userId: number
}): Promise<any> {
    return db.refreshToken.create({
        data: {
            id: jti,
            hashedToken: hashToken(refreshToken),
            user_id: userId
        }
    });
}

export function findRefreshTokenById(id: string): Promise<any> {
    return db.refreshToken.findUnique({
        where: {
            id
        }
    });
}

export function deleteRefreshToken(id: string): Promise<any> {
    return db.refreshToken.update({
        where: {
            id
        },
        data: {
            revoked: true
        }
    });
}

export function revokeTokens(userId: string): Promise<any> {
    return db.refreshToken.updateMany({
        where: {
            userId
        },
        data: {
            revoked: true
        }
    });
}