"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const API_KEY = process.env.API_KEY;
const auth = (req, res, next) => {
    if (!req.header('x-api-key') || req.header('x-api-key') !== API_KEY) {
        return res.status(401).send({
            code: res.statusCode,
            text: 'Unauthorized',
            message: 'Invalid API key',
            data: undefined,
        });
    }
    next();
};
exports.auth = auth;
