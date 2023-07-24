"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotionFavoritesRule = void 0;
const getNotionFavoritesRule = (results, activeOnly = true) => {
    const favorites = results.map((result) => {
        return {
            id: result.id,
            active: result.properties.active.checkbox,
            name: result.properties.name.title[0].plain_text,
            article_id: result.properties.article_id.number,
        };
    });
    return activeOnly
        ? favorites.filter((favorite) => favorite.active)
        : favorites;
};
exports.getNotionFavoritesRule = getNotionFavoritesRule;
