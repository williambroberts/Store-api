"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.failController = exports.getAllController = exports.getOneController = exports.logoutController = exports.registerController = exports.loginController = exports.isAuthController = void 0;
const Errors_1 = require("../utils/Errors");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = __importDefault(require("../db/db"));
const passwords_1 = require("../Helpers/passwords");
exports.isAuthController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200);
    res.json({
        success: true,
        status: 200,
        isAuth: req.isAuthenticated()
    });
}));
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200);
    res.json({ success: true,
        user_email: req.user.email,
        user_id: req.user.id,
        status: 200,
        route: "loginController"
    });
});
exports.loginController = loginController;
exports.registerController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.matchedData;
    console.log("register controller");
    if (!email || !password) {
        throw new Errors_1.BadRequestError("Invalid credentials");
    }
    const [row] = yield db_1.default.query(`
    select * from store_users
    where email = ?
    limit 1;
    `, [email]);
    console.log(row, "row");
    if (row.length > 0) {
        throw new Errors_1.ConflictError("Email already in use");
    }
    const hashed = (0, passwords_1.hashPassword)(password);
    if (hashed) {
        //update to db
        const [row] = yield db_1.default.query(`
        insert into store_users (email,password)
        values (?, ?)
        `, [email, hashed]);
        if (row) {
            res.status(200);
            res.json({ success: true, status: 200 });
        }
        else {
            throw new Errors_1.InternalServerError('Error registering user to DB');
        }
    }
    else {
        throw new Errors_1.InternalServerError("Error hashing password");
    }
}));
exports.logoutController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("loggin out");
    req.logout(function (err) {
        if (err) {
            res.status(500);
            return res.json({ success: false });
        }
        res.status(200);
        return res.json({ success: true });
    });
}));
exports.getOneController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params;
    const [row] = yield db_1.default.query(`
    select * from store_users
    where id = ?
    limit 1
    `, [id]);
    if (row) {
        res.status(200);
        res.json({
            success: true,
            row: row
        });
    }
    else {
        res.status(404);
        res.json({ success: false });
    }
}));
exports.getAllController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [row] = yield db_1.default.query(`
    select * from store_users
    `);
    if (row) {
        res.status(200);
        res.json({
            success: true,
            row: row
        });
    }
}));
exports.failController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = req.session.messages.at(-1);
    throw new Errors_1.BadRequestError(message);
}));
