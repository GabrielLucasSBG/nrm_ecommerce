import * as crypto from 'crypto';

export function hashToken(token: string): string {
    return crypto.createHash('sha512').update(token).digest('hex');
}