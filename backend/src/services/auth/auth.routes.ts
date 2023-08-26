import express, {Router, Request, Response, NextFunction} from 'express';
import {v4 as uuidv4} from 'uuid';
import {generateTokens} from '../../utils/jwt';
import {addRefreshTokenToWhitelist, findRefreshTokenById, deleteRefreshToken, revokeTokens} from './auth.services';
import jwt from 'jsonwebtoken';
import {hashToken} from "../../utils/hashToken";

const bcrypt = require('bcrypt');

const router: Router = express.Router();
import {findUserByEmail, createUser, findUserById} from '../users/users.services';

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password, name} = req.body;
        if (!email || !password || !name) {
            res.status(400);
            throw new Error('You must provide an email, a password and a name.');
        }

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            res.status(400);
            throw new Error('Email already in use.');
        }

        const user = await createUser({email, password, name});

        const jti = uuidv4();
        const {accessToken, refreshToken} = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({jti, refreshToken, userId: user.id});

        res.json({
            accessToken,
            refreshToken,
        });
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password}: { email: string, password: string } = req.body;

        if (!email || !password) {
            res.status(400);
            res.json('You must provide an email and a password.');
        }

        const existingUser = await findUserByEmail(email);

        if (!existingUser) {
            res.status(403);
            res.json('Invalid login credentials.');
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);

        if (!validPassword) {
            res.status(403);
            res.json('Invalid login credentials.');
        }

        const jti = uuidv4();
        const {accessToken, refreshToken} = generateTokens(existingUser, jti);
        await addRefreshTokenToWhitelist({jti, refreshToken, userId: existingUser.id});
        const isAdmin = existingUser.is_admin;

        res.json({
            accessToken,
            refreshToken,
            isAdmin
        });
    } catch (err) {
        next(err);
    }
});

router.post('/refreshToken', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {refreshToken}: { refreshToken: string } = req.body;

        if (!refreshToken) {
            res.status(400);
            throw new Error('Missing refresh token.');
        }

        const payload: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "");
        const savedRefreshToken = await findRefreshTokenById(payload.jti);

        if (!savedRefreshToken || savedRefreshToken.revoked === true) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const hashedToken = hashToken(refreshToken);
        if (hashedToken !== savedRefreshToken.hashedToken) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const user = await findUserById(payload.userId);
        if (!user) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        await deleteRefreshToken(savedRefreshToken.id);
        const jti = uuidv4();
        const {accessToken, refreshToken: newRefreshToken} = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({jti, refreshToken: newRefreshToken, userId: user.id});

        res.json({
            accessToken,
            refreshToken: newRefreshToken
        });
    } catch (err) {
        next(err);
    }
});

router.post('/revokeRefreshTokens', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {userId}: { userId: string } = req.body;
        await revokeTokens(userId);
        res.json({message: `Tokens revoked for user with id #${userId}`});
    } catch (err) {
        next(err);
    }
});

export default router;