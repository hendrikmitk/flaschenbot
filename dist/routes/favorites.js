"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notion_client_1 = __importDefault(require("../client/notion.client"));
const filter_notion_favorites_rule_1 = require("../rules/filter-notion-favorites.rule");
const get_notion_favorites_rule_1 = require("../rules/get-notion-favorites.rule");
const status = express_1.default.Router();
const favoritesDatabaseId = process.env.FAVORITES_DATABASE_ID;
status.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!favoritesDatabaseId) {
        return res.status(500).send({
            code: res.statusCode,
            text: 'Internal Server Error',
            message: 'No Notion database ID could be found',
            data: undefined,
        });
    }
    try {
        const response = yield notion_client_1.default.getDatabase(favoritesDatabaseId);
        const results = response.results;
        return res.status(200).send({
            code: res.statusCode,
            text: 'OK',
            message: undefined,
            data: (0, filter_notion_favorites_rule_1.filterNotionFavoritesRule)((0, get_notion_favorites_rule_1.getNotionFavoritesRule)(results)),
        });
    }
    catch (error) {
        return res.status(500).send({
            code: res.statusCode,
            text: 'Internal Server Error',
            message: error instanceof Error ? error.message : 'An unknown error occurred',
            data: undefined,
        });
    }
}));
exports.default = status;
