import express, { Request, Response, Router } from 'express';

import notionClient from '../client/notion.client';
import { Result } from '../client/notion.response';
import { Favorite } from '../models/favorite.model';

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

      const favorites: Favorite[] = results.map((result: Result) => {
        return {
          id: result.id,
          active: result.properties.active.checkbox,
          name: result.properties.name.title[0].plain_text,
          article_id: result.properties.article_id.number,
        };
      });

      return res.status(200).send({
        code: res.statusCode,
        text: 'OK',
        message: undefined,
        data: favorites,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

export default status;
