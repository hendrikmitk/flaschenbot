import express, { Request, Response, Router } from 'express';

import notionClient from '../client/notion.client';
import { Result } from '../client/notion.response';
import { getNotionFavoritesRule } from '../rules/get-notion-favorites.rule';

const status: Router = express.Router();

export const databaseId = process.env.NOTION_DATABASE_ID;

status.get('/', (req: Request, res: Response) => {
  if (!databaseId) {
    return res.status(500).send({
      code: res.statusCode,
      text: 'Internal Server Error',
      message: 'No Notion database ID could be found',
      data: undefined,
    });
  }

  notionClient
    .getDatabase(databaseId)
    .then((response) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const results: Result[] = response.results;

      return res.status(200).send({
        code: res.statusCode,
        text: 'OK',
        message: undefined,
        data: getNotionFavoritesRule(results),
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

export default status;
