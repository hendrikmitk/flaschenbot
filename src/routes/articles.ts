import express, { Request, Response, Router } from 'express';

import flaschenpostClient from '../client/flaschenpost.client';
import { getFlaschenpostOffersRule } from '../rules/get-flaschenpost-offers.rule';
import { getUniqueArticleIdsRule } from '../rules/get-unique-article-ids.rule';

const articles: Router = express.Router();

articles.get('/', (req: Request, res: Response) => {
  const queryParams = req.query;

  if (!('id' in queryParams)) {
    return res.status(422).send({
      code: res.statusCode,
      text: 'Unprocessable Content',
      message: "Request must contain an 'id' query parameter",
      data: undefined,
    });
  }

  flaschenpostClient
    .getArticles(
      getUniqueArticleIdsRule(queryParams['id'] as string[] | string)
    )
    .then((response) => {
      return res.status(200).send({
        code: res.statusCode,
        text: 'OK',
        message: undefined,
        data: getFlaschenpostOffersRule(response.data),
      });
    })
    .catch((error) => {
      return res.status(500).send({
        code: res.statusCode,
        text: 'Internal Server Error',
        message: 'Failed to load articles from flaschenpost',
        data: error,
      });
    });
});

export default articles;
