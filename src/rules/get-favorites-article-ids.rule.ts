import { Favorite } from '../models/favorite.model';

/**
 * Extracts the article IDs from the given favorites.
 * @param {Favorite[]} favorites - The favorites to extract article IDs from.
 * @returns {string[]} The extracted article IDs.
 */
export const getFavoritesArticleIdsRule = (favorites: Favorite[]): string[] => [
  ...new Set(
    favorites.map((favorite: Favorite) => favorite.flaschenpost_id.toString())
  ),
];
