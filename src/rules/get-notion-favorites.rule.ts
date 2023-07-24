import { Result } from '../client/notion.response';
import { Favorite } from '../models/favorite.model';

export const getNotionFavoritesRule = (
  results: Result[],
  activeOnly = true
): Favorite[] => {
  const favorites: Favorite[] = results.map((result: Result) => {
    return {
      id: result.id,
      active: result.properties.active.checkbox,
      name: result.properties.name.title[0].plain_text,
      article_id: result.properties.article_id.number,
    };
  });

  return activeOnly
    ? favorites.filter((favorite: Favorite) => favorite.active)
    : favorites;
};
