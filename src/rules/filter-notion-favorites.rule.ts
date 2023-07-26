import { Favorite } from '../models/favorite.model';

export const filterNotionFavoritesRule = (favorites: Favorite[]): Favorite[] =>
  favorites.filter((favorite: Favorite) => favorite.active);
