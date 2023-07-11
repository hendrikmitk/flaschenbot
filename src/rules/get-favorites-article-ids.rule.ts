import { Favorite } from '../models/favorite.model';

export const getFavoritesArticleIdsRule = (favorites: Favorite[]): string[] => [
  ...new Set(
    favorites.map((favorite: Favorite) => {
      return favorite.article_id.toString();
    })
  ),
];
