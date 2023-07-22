"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotionFavoritesRule = void 0;
const getNotionFavoritesRule = (results) => results.map((result) => {
    return {
        id: result.id,
        active: result.properties.active.checkbox,
        name: result.properties.name.title[0].plain_text,
        article_id: result.properties.article_id.number,
    };
});
exports.getNotionFavoritesRule = getNotionFavoritesRule;
