"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allUsers = exports.findUserById = exports.createUser = exports.findUserByEmail = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../utils/db");
function findUserByEmail(email) {
    return db_1.db.users.findUnique({
        where: {
            email
        }
    });
}
exports.findUserByEmail = findUserByEmail;
function createUser(user) {
    user.password = bcrypt_1.default.hashSync(user.password, 12);
    return db_1.db.users.create({
        data: user
    });
}
exports.createUser = createUser;
function findUserById(id) {
    return db_1.db.users.findUnique({
        where: {
            id
        }
    });
}
exports.findUserById = findUserById;
function allUsers() {
    return db_1.db.users.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            is_admin: true
        },
    });
}
exports.allUsers = allUsers;
