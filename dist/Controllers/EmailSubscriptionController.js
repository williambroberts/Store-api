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
exports.subscribeController = void 0;
const db_1 = __importDefault(require("../db/db"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Errors_1 = require("../utils/Errors");
exports.subscribeController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //query db add email to the store_emails table
    let { email } = req.matchedData;
    console.log("email sub controller", email);
    const result = yield db_1.default.query(`
    insert ignore into store_emails (email)
    VALUES (?);
    `, [email]);
    if (result) {
        res.status(200);
        res.json({
            success: true,
            email: email
        });
    }
    else {
        throw new Errors_1.InternalServerError("Subscription failed");
    }
}));
