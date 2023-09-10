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
const db_js_1 = __importDefault(require("../db/db.js"));
const passwords_js_1 = require("../Helpers/passwords.js");
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
//passport 
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.serializeUser(function (user, done) {
    console.log("serializing user", user);
    done(null, user.email);
});
passport_1.default.deserializeUser(function (id, done) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id, "desierialze");
        try {
            const [user] = yield db_js_1.default.query(`
    select * from store_users
    WHERE email = ?
    `, [id]);
            console.log(user, id, "deserializing user");
            done(null, user);
        }
        catch (err) {
            done(err);
        }
        ;
    });
});
passport_1.default.use(new LocalStrategy({ usernameField: 'email' }, localVerifyFunctionasync));
function localVerifyFunctionasync(email, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(email, password, "❤️");
        //sanitize and validate first
        try {
            const [row] = yield db_js_1.default.query(`select * 
        from store_users
        WHERE email = ? 
        `, [email]);
            const user = row[0];
            //console.log(user)
            if (!user) {
                return done(null, false, { message: "Incorrect email" });
            }
            ;
            const passwords = { raw: password, hash: user.password };
            const match = (0, passwords_js_1.comparePassword)(passwords);
            if (password && !match) {
                return done(null, false, { message: "Incorrect password" });
            }
            ;
            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
        ;
    });
}
