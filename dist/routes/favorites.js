"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoritesDatabaseId = void 0;
const express_1 = __importDefault(require("express"));
const notion_client_1 = __importDefault(require("../client/notion.client"));
const filter_notion_favorites_rule_1 = require("../rules/filter-notion-favorites.rule");
const get_notion_favorites_rule_1 = require("../rules/get-notion-favorites.rule");
const status = express_1.default.Router();
exports.favoritesDatabaseId = process.env.FAVORITES_DATABASE_ID;
status.get('/', (req, res) => {
    if (!exports.favoritesDatabaseId) {
        return res.status(500).send({
            code: res.statusCode,
            text: 'Internal Server Error',
            message: 'No Notion database ID could be found',
            data: undefined,
        });
    }
    notion_client_1.default
        .getDatabase(exports.favoritesDatabaseId)
        .then((response) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const results = response.results;
        return res.status(200).send({
            code: res.statusCode,
            text: 'OK',
            message: undefined,
            data: (0, filter_notion_favorites_rule_1.filterNotionFavoritesRule)((0, get_notion_favorites_rule_1.getNotionFavoritesRule)(results)),
        });
    })
        .catch((error) => {
        console.log(error);
    });
});
exports.default = status;
