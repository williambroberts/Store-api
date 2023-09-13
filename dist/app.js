"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./Routers/authRouter"));
const errorMiddleware_1 = require("./Middleware/errorMiddleware");
const express_session_1 = __importDefault(require("express-session"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const SESSION = express_session_1.default;
const body_parser_1 = __importDefault(require("body-parser"));
const express_mysql_session_1 = __importDefault(require("express-mysql-session"));
const suggestRouter_1 = __importDefault(require("./Routers/suggestRouter"));
const MySQLStore = (0, express_mysql_session_1.default)(SESSION);
let options = {};
if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PORT && process.env.DB_PASSWORD && process.env.DB_DATABASE) {
    options = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    };
}
const sessionStore = new MySQLStore(options, db_1.default);
app.use((0, cookie_parser_1.default)());
app.use(SESSION({
    name: "fh485-dadwa",
    saveUninitialized: false,
    resave: false,
    secret: "3824398",
    store: sessionStore,
    //cookie:{secure:true,sameSite:'none'}
    // cookie:{maxAge:3600000}
}));
sessionStore.onReady().then(() => {
    // MySQL session store ready for use.
    console.log('MySQLStore ready');
}).catch(error => {
    // Something went wrong.
    console === null || console === void 0 ? void 0 : console.error(error);
});
sessionStore.close().then(() => {
    // Successfuly closed the MySQL session store.
    console.log('MySQLStore closed');
}).catch(error => {
    // Something went wrong.
    console.error(error);
});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://store-five-xi.vercel.app'],
    credentials: true
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.status(200);
    res.json({ success: "true 🕊️" });
});
app.use("/auth", authRouter_1.default);
app.use("/suggest", suggestRouter_1.default);
app.use(errorMiddleware_1.errorHandler);
exports.default = app;
