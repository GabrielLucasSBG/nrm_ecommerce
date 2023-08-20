import express, {Router, Request, Response, NextFunction} from 'express';
import {isAuthenticated} from '../../middleware/middleware';
import {findUserById} from './users.services';

const router: Router = express.Router();

router.get('/profile/:id', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
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