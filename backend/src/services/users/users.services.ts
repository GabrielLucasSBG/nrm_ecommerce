import bcrypt from 'bcrypt';
import {db} from '../../utils/db';

interface User {
    email: string;
    password: string;
    name: string;
}

export function findUserByEmail(email: string) {
    return db.users.findUnique({
        where: {
            email
        }
    });
}

export function createUser(user: User) {
    user.password = bcrypt.hashSync(user.password, 12);
    return db.users.create({
        data: user
    });
}

export function findUserById(id: number) {
    return db.users.findUnique({
        where: {
            id
        }
    });
}