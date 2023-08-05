import express, { Request, Response, Router } from 'express';

import notionClient from '../client/notion.client';
import { Result } from '../client/notion.response';
import { filterNotionFavoritesRule } from '../rules/filter-notion-favorites.rule';
import { getNotionFavoritesRule } from '../rules/get-notion-favorites.rule';

const status: Router = express.Router();

export const favoritesDatabaseId = process.env.FAVORITES_DATABASE_ID;

status.get('/', (req: Request, res: Response) => {
  if (!favoritesDatabaseId) {
    return res.status(500).send({
      code: res.statusCode,
      text: 'Internal Server Error',
      message: 'No Notion database ID could be found',
      data: undefined,
    });
  }

  notionClient
    .getDatabase(favoritesDatabaseId)
    .then((response) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const results: Result[] = response.results;

      return res.status(200).send({
        code: res.statusCode,
        text: 'OK',
        message: undefined,
        data: filterNotionFavoritesRule(getNotionFavoritesRule(results)),
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

export default status;
