"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ApiError_1 = require("../../shared/errors/ApiError");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof ApiError_1.ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.log(err);
    return res.status(500).json({ message: err.message });
};
exports.errorHandler = errorHandler;
