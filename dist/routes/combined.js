"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseId = void 0;
const express_1 = __importDefault(require("express"));
const flaschenpost_client_1 = __importDefault(require("../client/flaschenpost.client"));
const mastodon_client_1 = __importDefault(require("../client/mastodon.client"));
const notion_client_1 = __importDefault(require("../client/notion.client"));
const compose_mastodon_status_rule_1 = require("../rules/compose-mastodon-status.rule");
const get_favorites_article_ids_rule_1 = require("../rules/get-favorites-article-ids.rule");
const get_flaschenpost_offers_rule_1 = require("../rules/get-flaschenpost-offers.rule");
const get_notion_favorites_rule_1 = require("../rules/get-notion-favorites.rule");
const auth_1 = require("../utils/auth");
const combined = express_1.default.Router();
exports.databaseId = process.env.NOTION_DATABASE_ID;
combined.get('/', auth_1.auth, (req, res) => {
    if (!exports.databaseId) {
        return res.status(500).send({
            code: res.statusCode,
            text: 'Internal Server Error',
            message: 'No Notion database ID could be found',
            data: undefined,
        });
    }
    notion_client_1.default
        .getDatabase(exports.databaseId)
        .then((response) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const results = response.results;
        const favorites = (0, get_notion_favorites_rule_1.getNotionFavoritesRule)(results);
        flaschenpost_client_1.default
            .getArticles((0, get_favorites_article_ids_rule_1.getFavoritesArticleIdsRule)(favorites))
            .then((response) => {
            const offersOnSale = (0, get_flaschenpost_offers_rule_1.getFlaschenpostOffersRule)(response.data).filter((offer) => offer.onSale);
            if (offersOnSale.length === 0)
                return res.status(200).send({
                    code: res.statusCode,
                    text: 'OK',
                    message: 'No product on sale',
                    data: undefined,
                });
            mastodon_client_1.default
                .postStatus((0, compose_mastodon_status_rule_1.composeMastodonStatusRule)(offersOnSale))
                .then(() => {
                return res.status(201).send({
                    code: res.statusCode,
                    text: 'Created',
                    message: undefined,
                    data: offersOnSale,
                });
            })
                .catch((error) => {
                console.log(error);
            });
        })
            .catch((error) => {
            console.log(error);
        });
    })
        .catch((error) => {
        console.log(error);
    });
});
exports.default = combined;
