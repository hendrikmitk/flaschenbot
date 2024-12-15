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
const mastodon_client_1 = __importDefault(require("../client/mastodon.client"));
const compose_mastodon_status_rule_1 = require("../rules/compose-mastodon-status.rule");
const get_flaschenpost_offers_rule_1 = require("../rules/get-flaschenpost-offers.rule");
const get_unique_article_ids_rule_1 = require("../rules/get-unique-article-ids.rule");
const auth_1 = require("../utils/auth");
const status = express_1.default.Router();
status.get('/', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryParams = req.query;
    if (!('id' in queryParams)) {
        return res.status(422).send({
            code: res.statusCode,
            text: 'Unprocessable Content',
            message: "Request must contain an 'id' query parameter",
            data: undefined,
        });
    }
    try {
        const articleIds = (0, get_unique_article_ids_rule_1.getUniqueArticleIdsRule)(queryParams['id']);
        const response = yield flaschenpost_client_1.default.getArticles(articleIds);
        const offersOnSale = (0, get_flaschenpost_offers_rule_1.getFlaschenpostOffersRule)(response.data).filter((offer) => offer.onSale);
        if (offersOnSale.length === 0) {
            return res.status(200).send({
                code: res.statusCode,
                text: 'OK',
                message: 'No product on sale',
                data: undefined,
            });
        }
        yield mastodon_client_1.default.postStatus((0, compose_mastodon_status_rule_1.composeMastodonStatusRule)(offersOnSale));
        return res.status(201).send({
            code: res.statusCode,
            text: 'Created',
            message: undefined,
            data: offersOnSale,
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
