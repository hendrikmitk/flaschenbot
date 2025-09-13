import { Result } from '../client/notion.response';
import { Favorite } from '../models/favorite.model';

/**
 * Retrieves favorites from Notion.
 * @param {Result[]} results - The results to retrieve favorites from.
 * @returns {Favorite[]} The retrieved favorites.
 */
export const getNotionFavoritesRule = (results: Result[]): Favorite[] =>
  results.map((result: Result) => {
    return {
      id: result.id,
      active: result.properties.active?.checkbox || false,
      article_name: result.properties.article_name.title[0].plain_text,
      flaschenpost_id: result.properties.flaschenpost_id.number,
    };
  });
