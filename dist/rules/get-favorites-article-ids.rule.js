"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavoritesArticleIdsRule = void 0;
const getFavoritesArticleIdsRule = (favorites) => [
    ...new Set(favorites.map((favorite) => favorite.flaschenpost_id.toString())),
];
exports.getFavoritesArticleIdsRule = getFavoritesArticleIdsRule;
