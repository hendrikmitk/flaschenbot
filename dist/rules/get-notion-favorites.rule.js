"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotionFavoritesRule = void 0;
const getNotionFavoritesRule = (results) => results.map((result) => {
    return {
        id: result.id,
        active: result.properties.active.checkbox,
        article_name: result.properties.article_name.title[0].plain_text,
        flaschenpost_id: result.properties.flaschenpost_id.number,
    };
});
exports.getNotionFavoritesRule = getNotionFavoritesRule;
