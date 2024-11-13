"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE_URL = 'https://mstdn.social';
const TOKEN = process.env.MASTODON_TOKEN;
const client = () => {
    const config = {
        baseURL: BASE_URL,
        headers: { Authorization: `Bearer ${TOKEN}` },
    };
    return axios_1.default.create(config);
};
exports.client = client;
exports.default = {
    postStatus(toot) {
        return (0, exports.client)().post(`/api/v1/statuses`, {}, {
            params: { status: toot },
        });
    },
};
