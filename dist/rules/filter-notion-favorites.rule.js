"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterNotionFavoritesRule = void 0;
const filterNotionFavoritesRule = (favorites) => favorites.filter((favorite) => favorite.active);
exports.filterNotionFavoritesRule = filterNotionFavoritesRule;
