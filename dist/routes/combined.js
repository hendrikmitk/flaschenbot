"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const flaschenpost_client_1 = __importDefault(require("../client/flaschenpost.client"));
const mastodon_client_1 = __importDefault(require("../client/mastodon.client"));
const notion_client_1 = __importDefault(require("../client/notion.client"));
const check_ids_for_equality_1 = require("../functions/check-ids-for-equality");
const compose_mastodon_status_rule_1 = require("../rules/compose-mastodon-status.rule");
const filter_notion_favorites_rule_1 = require("../rules/filter-notion-favorites.rule");
const get_favorites_article_ids_rule_1 = require("../rules/get-favorites-article-ids.rule");
const get_flaschenpost_offers_rule_1 = require("../rules/get-flaschenpost-offers.rule");
const get_notion_favorites_rule_1 = require("../rules/get-notion-favorites.rule");
const auth_1 = require("../utils/auth");
const combined = express_1.default.Router();
const favoritesDatabaseId = process.env.FAVORITES_DATABASE_ID;
const savedOffersDatabaseId = process.env.SAVED_OFFERS_DATABASE_ID;
combined.get('/', auth_1.auth, (req, res) => {
    if (!favoritesDatabaseId || !savedOffersDatabaseId) {
        return res.status(500).send({
            code: res.statusCode,
            text: 'Internal Server Error',
            message: 'No Notion database ID could be found',
            data: undefined,
        });
    }
    notion_client_1.default
        .getDatabase(favoritesDatabaseId)
        .then((response) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const results = response.results;
        const favorites = (0, filter_notion_favorites_rule_1.filterNotionFavoritesRule)((0, get_notion_favorites_rule_1.getNotionFavoritesRule)(results));
        if (favorites.length === 0)
            return res.status(200).send({
                code: res.statusCode,
                text: 'OK',
                message: 'No active favorites in database',
                data: undefined,
            });
        flaschenpost_client_1.default
            .getArticles((0, get_favorites_article_ids_rule_1.getFavoritesArticleIdsRule)(favorites))
            .then((response) => {
            const currentOffers = (0, get_flaschenpost_offers_rule_1.getFlaschenpostOffersRule)(response.data).filter((offer) => offer.onSale);
            if (currentOffers.length === 0)
                return res.status(200).send({
                    code: res.statusCode,
                    text: 'OK',
                    message: 'No products on sale',
                    data: undefined,
                });
            const currentOfferIds = currentOffers.map((currentOffer) => currentOffer.id);
            notion_client_1.default
                .getDatabase(savedOffersDatabaseId)
                .then((response) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const savedOffers = response.results;
                const savedOfferIds = savedOffers.map((savedOffer) => savedOffer.properties.flaschenpost_id.number);
                if ((0, check_ids_for_equality_1.checkIdsForEquality)(currentOfferIds, savedOfferIds)) {
                    return res.status(200).send({
                        code: res.statusCode,
                        text: 'OK',
                        message: 'Products on sale have not changed',
                        data: undefined,
                    });
                }
                savedOffers.forEach((savedOffer) => {
                    notion_client_1.default.archivePage(savedOffer.id).catch((error) => {
                        console.log(error);
                    });
                });
                currentOffers.forEach((currentOffer) => {
                    notion_client_1.default.createPage(savedOffersDatabaseId, currentOffer.name, currentOffer.id);
                });
                mastodon_client_1.default
                    .postStatus((0, compose_mastodon_status_rule_1.composeMastodonStatusRule)(currentOffers))
                    .then(() => {
                    return res.status(201).send({
                        code: res.statusCode,
                        text: 'Created',
                        message: undefined,
                        data: currentOffers,
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
    })
        .catch((error) => {
        console.log(error);
    });
});
exports.default = combined;
