"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aysncHandler = void 0;
const aysncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.aysncHandler = aysncHandler;
