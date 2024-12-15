import express, { Request, Response, Router } from 'express';

import flaschenpostClient from '../client/flaschenpost.client';
import { getFlaschenpostOffersRule } from '../rules/get-flaschenpost-offers.rule';
import { getUniqueArticleIdsRule } from '../rules/get-unique-article-ids.rule';

const articles: Router = express.Router();

articles.get('/', async (req: Request, res: Response) => {
  const queryParams = req.query;

  if (!('id' in queryParams)) {
    return res.status(422).send({
      code: res.statusCode,
      text: 'Unprocessable Content',
      message: "Request must contain an 'id' query parameter",
      data: undefined,
    });
  }

  try {
    const articleIds = getUniqueArticleIdsRule(
      queryParams['id'] as string[] | string
    );
    const response = await flaschenpostClient.getArticles(articleIds);

    return res.status(200).send({
      code: res.statusCode,
      text: 'OK',
      message: undefined,
      data: getFlaschenpostOffersRule(response.data),
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

export default articles;
