"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = void 0;
const Errors_1 = require("../utils/Errors");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: err.stack,
        status: statusCode
    });
};
exports.errorHandler = errorHandler;
const notFound = (err, req, res, next) => {
    const error = new Errors_1.NotFoundError(`Not Found ${req.originalUrl}`);
    next(error);
};
exports.notFound = notFound;
