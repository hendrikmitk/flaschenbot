"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@notionhq/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new client_1.Client({ auth: process.env.NOTION_API_TOKEN });
exports.default = {
    getDatabase(databaseId) {
        return client.databases.query({
            database_id: databaseId,
        });
    },
    getPage(pageId) {
        return client.pages.retrieve({ page_id: pageId });
    },
};
