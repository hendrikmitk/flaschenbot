import { Result } from '../client/notion.response';
import { Favorite } from '../models/favorite.model';

export const getNotionFavoritesRule = (results: Result[]): Favorite[] =>
  results.map((result: Result) => {
    return {
      id: result.id,
      active: result.properties.active.checkbox,
      article_name: result.properties.article_name.title[0].plain_text,
      flaschenpost_id: result.properties.flaschenpost_id.number,
    };
  });
