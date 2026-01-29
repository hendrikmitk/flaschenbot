import express, { Request, Response, Router } from 'express';

import notionClient from '../client/notion.client';
import { Result } from '../client/notion.response';
import { getNotionFavoritesRule } from '../rules/get-notion-favorites.rule';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const status: Router = express.Router();

const favoritesDatabaseId = process.env.FAVORITES_DATABASE_ID;

status.get('/', async (req: Request, res: Response) => {
  if (!favoritesDatabaseId) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      code: res.statusCode,
      text: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: 'No Notion database ID could be found',
      data: undefined,
    });
  }

  try {
    const response = await notionClient.getDatabase(
      favoritesDatabaseId as string
    );
    const results = response.results as Result[];

    return res.status(StatusCodes.OK).send({
      code: res.statusCode,
      text: ReasonPhrases.OK,
      message: undefined,
      data: getNotionFavoritesRule(results),
    });
  } catch (error: Error | unknown) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      code: res.statusCode,
      text: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
      data: undefined,
    });
  }
});

export default status;
