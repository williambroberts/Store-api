"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableAuthenticateAdmin = exports.enableAuthenticate = void 0;
const Errors_1 = require("../utils/Errors");
const enableAuthenticate = (req, res, next) => {
    // console.log(req.isAuthenticated(),"here will")
    if (req.isAuthenticated()) {
        return next();
    }
    throw new Errors_1.UnauthorizedError("Route requires authenticated user");
};
exports.enableAuthenticate = enableAuthenticate;
const enableAuthenticateAdmin = (req, res, next) => {
    if (!req.isAuthenticated) {
        throw new Errors_1.UnauthorizedError("Route requires authenticated user");
    }
    let admin = req.user[0].admin;
    console.log(admin, "admin status");
    if (admin === 0) {
        throw new Errors_1.ForbiddenError("Access forbidden");
    }
    return next();
};
exports.enableAuthenticateAdmin = enableAuthenticateAdmin;
