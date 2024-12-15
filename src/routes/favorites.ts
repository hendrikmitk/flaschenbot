import express, { Request, Response, Router } from 'express';

import notionClient from '../client/notion.client';
import { Result } from '../client/notion.response';
import { filterNotionFavoritesRule } from '../rules/filter-notion-favorites.rule';
import { getNotionFavoritesRule } from '../rules/get-notion-favorites.rule';

const status: Router = express.Router();

const favoritesDatabaseId = process.env.FAVORITES_DATABASE_ID;

status.get('/', async (req: Request, res: Response) => {
  if (!favoritesDatabaseId) {
    return res.status(500).send({
      code: res.statusCode,
      text: 'Internal Server Error',
      message: 'No Notion database ID could be found',
      data: undefined,
    });
  }

  try {
    const response = await notionClient.getDatabase(
      favoritesDatabaseId as string
    );
    const results = response.results as Result[];

    return res.status(200).send({
      code: res.statusCode,
      text: 'OK',
      message: undefined,
      data: filterNotionFavoritesRule(getNotionFavoritesRule(results)),
    });
  } catch (error: Error | unknown) {
    return res.status(500).send({
      code: res.statusCode,
      text: 'Internal Server Error',
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
      data: undefined,
    });
  }
});

export default status;
