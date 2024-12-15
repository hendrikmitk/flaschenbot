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
const flaschenpost_client_1 = __importDefault(require("../client/flaschenpost.client"));
const get_flaschenpost_offers_rule_1 = require("../rules/get-flaschenpost-offers.rule");
const get_unique_article_ids_rule_1 = require("../rules/get-unique-article-ids.rule");
const http_status_codes_1 = require("http-status-codes");
const articles = express_1.default.Router();
articles.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryParams = req.query;
    if (!('id' in queryParams)) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).send({
            code: res.statusCode,
            text: http_status_codes_1.ReasonPhrases.UNPROCESSABLE_ENTITY,
            message: "Request must contain an 'id' query parameter",
            data: undefined,
        });
    }
    try {
        const articleIds = (0, get_unique_article_ids_rule_1.getUniqueArticleIdsRule)(queryParams['id']);
        const response = yield flaschenpost_client_1.default.getArticles(articleIds);
        return res.status(http_status_codes_1.StatusCodes.OK).send({
            code: res.statusCode,
            text: http_status_codes_1.ReasonPhrases.OK,
            message: undefined,
            data: (0, get_flaschenpost_offers_rule_1.getFlaschenpostOffersRule)(response.data),
        });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            code: res.statusCode,
            text: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR,
            message: error instanceof Error ? error.message : 'An unknown error occurred',
            data: undefined,
        });
    }
}));
exports.default = articles;
