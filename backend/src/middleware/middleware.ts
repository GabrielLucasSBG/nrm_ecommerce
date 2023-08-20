import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const {authorization} = req.headers;

    if (!authorization) {
        res.status(401);
        throw new Error('🚫 Un-Authorized 🚫');
    }

    try {
        req.body = jwt.verify(authorization, process.env.JWT_ACCESS_SECRET || "");
    } catch (err: any) {
        res.status(401);
        if (err.name === 'TokenExpiredError') {
            throw new Error(err.name);
        }
        throw new Error('🚫 Un-Authorized 🚫');
    }

    return next();
}