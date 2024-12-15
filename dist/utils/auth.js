"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const http_status_codes_1 = require("http-status-codes");
const API_KEY = process.env.API_KEY;
const auth = (req, res, next) => {
    if (!req.header('x-api-key') || req.header('x-api-key') !== API_KEY) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({
            code: res.statusCode,
            text: http_status_codes_1.ReasonPhrases.UNAUTHORIZED,
            message: 'Invalid API key',
            data: undefined,
        });
    }
    next();
};
exports.auth = auth;
