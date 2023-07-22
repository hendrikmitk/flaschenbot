"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const axios_1 = __importDefault(require("axios"));
const getUrl = (baseUrl, warehouseId) => {
    return `${baseUrl}/elastic-query-portal/${warehouseId}`;
};
const BASE_URL = 'https://www.flaschenpost.de';
const WAREHOUSE_ID = 28;
const URL = getUrl(BASE_URL, WAREHOUSE_ID);
const client = () => {
    const config = {
        baseURL: URL,
    };
    return axios_1.default.create(config);
};
exports.client = client;
exports.default = {
    getArticles(articleIds) {
        return (0, exports.client)().get(`/v1/articles`, {
            params: { list: JSON.stringify(articleIds) },
        });
    },
};
