import express, {Router, Request, Response, NextFunction} from 'express';
import {isAdmin, isAuthenticated} from '../../middleware/middleware';
import {allUsers, findUserById} from './users.services';

const router: Router = express.Router();

router.get('/all', [isAuthenticated, isAdmin], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await allUsers();
        delete users.password;
        res.json(users);
    } catch (err) {
        next(err);
    }
});

router.get('/profile/:id', [isAuthenticated, isAdmin], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const user = await findUserById(parseInt(id));
        delete user.password;
        res.json(user);
    } catch (err) {
        next(err);
    }
});

export default router;