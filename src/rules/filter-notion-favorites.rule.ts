import { Favorite } from '../models/favorite.model';

/**
 * Filters out inactive favorites.
 * @param {Favorite[]} favorites - The favorites to filter.
 * @returns {Favorite[]} The filtered favorites.
 */
export const filterNotionFavoritesRule = (favorites: Favorite[]): Favorite[] =>
  favorites.filter((favorite: Favorite) => favorite.active);
