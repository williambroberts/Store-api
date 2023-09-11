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
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../Middleware/authMiddleware");
const authController_1 = require("../Controllers/authController");
const Validators_1 = require("../utils/Validators");
const passport_1 = __importDefault(require("passport"));
const authRouter = express_1.default.Router();
const db_1 = __importDefault(require("../db/db"));
const passwords_1 = require("../Helpers/passwords");
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
            const [user] = yield db_1.default.query(`
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
            const [row] = yield db_1.default.query(`select * 
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
            const match = (0, passwords_1.comparePassword)(passwords);
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
authRouter.get("/fail", authController_1.failController);
authRouter.post("/register", Validators_1.registerVS, Validators_1.valitatorVS, authController_1.registerController);
authRouter.post("/logout", authMiddleware_1.enableAuthenticate, authController_1.logoutController);
authRouter.get("/status", authController_1.isAuthController);
authRouter.post("/login", passport_1.default.authenticate('local', { failureRedirect: '/auth/fail',
    failureMessage: true }), authController_1.loginController);
exports.default = authRouter;
