import express, { Request, Response, Router } from 'express';

import flaschenpostClient from '../client/flaschenpost.client';
import { getFlaschenpostOffersRule } from '../rules/get-flaschenpost-offers.rule';
import { getUniqueArticleIdsRule } from '../rules/get-unique-article-ids.rule';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const articles: Router = express.Router();

articles.get('/', async (req: Request, res: Response) => {
  const queryParams = req.query;

  if (!('id' in queryParams)) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
      code: res.statusCode,
      text: ReasonPhrases.UNPROCESSABLE_ENTITY,
      message: "Request must contain an 'id' query parameter",
      data: undefined,
    });
  }

  try {
    const articleIds = getUniqueArticleIdsRule(
      queryParams['id'] as string[] | string
    );
    const response = await flaschenpostClient.getArticles(articleIds);

    return res.status(StatusCodes.OK).send({
      code: res.statusCode,
      text: ReasonPhrases.OK,
      message: undefined,
      data: getFlaschenpostOffersRule(response.data),
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

export default articles;
